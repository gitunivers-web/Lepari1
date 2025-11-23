import crypto from 'crypto';

const COMETCHAT_APP_ID = process.env.VITE_COMETCHAT_APP_ID;
const COMETCHAT_REGION = process.env.VITE_COMETCHAT_REGION || 'eu';
const COMETCHAT_AUTH_KEY = process.env.COMETCHAT_AUTH_KEY;
const COMETCHAT_REST_API_KEY = process.env.COMETCHAT_REST_API_KEY;

interface CometChatUser {
  uid: string;
  name: string;
  avatar?: string;
  metadata?: Record<string, any>;
}

interface CachedToken {
  token: string;
  expiresAt: number;
}

export class CometChatService {
  private baseUrl: string;
  private isConfigured: boolean = false;
  private tokenCache: Map<string, CachedToken> = new Map();
  private TOKEN_CACHE_DURATION = 23 * 60 * 60 * 1000;

  constructor() {
    this.validateConfiguration();
    if (this.isConfigured && COMETCHAT_APP_ID) {
      this.baseUrl = `https://${COMETCHAT_APP_ID}.api-${COMETCHAT_REGION}.cometchat.io/v3`;
    } else {
      this.baseUrl = '';
    }
  }

  private validateConfiguration(): void {
    const requiredVars = {
      VITE_COMETCHAT_APP_ID: COMETCHAT_APP_ID,
      VITE_COMETCHAT_REGION: COMETCHAT_REGION,
      COMETCHAT_REST_API_KEY: COMETCHAT_REST_API_KEY,
    };

    const missingVars = Object.entries(requiredVars)
      .filter(([_, value]) => !value || value === 'PLACEHOLDER_APP_ID')
      .map(([key]) => key);

    if (missingVars.length > 0) {
      console.warn(`⚠️ CometChat configuration incomplete. Missing: ${missingVars.join(', ')}`);
      console.warn('⚠️ Chat functionality will be disabled');
      this.isConfigured = false;
    } else {
      this.isConfigured = true;
      console.log('✅ CometChat service configured successfully');
    }
  }

  public checkConfiguration(): { configured: boolean; message?: string } {
    if (!this.isConfigured) {
      return {
        configured: false,
        message: 'CometChat n\'est pas configuré. Veuillez configurer les variables d\'environnement.',
      };
    }
    return { configured: true };
  }

  async createUser(user: CometChatUser): Promise<any> {
    if (!this.isConfigured) {
      throw new Error('CometChat service is not configured');
    }

    try {
      const response = await fetch(`${this.baseUrl}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'appId': COMETCHAT_APP_ID!,
          'apiKey': COMETCHAT_REST_API_KEY!,
        },
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        const error = await response.json();
        if (error.error?.code === 'ERR_UID_ALREADY_EXISTS') {
          return { success: true, message: 'User already exists' };
        }
        throw new Error(`CometChat API error: ${JSON.stringify(error)}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error creating CometChat user:', error);
      throw error;
    }
  }

  async updateUser(uid: string, updates: Partial<CometChatUser>): Promise<any> {
    try {
      const response = await fetch(`${this.baseUrl}/users/${uid}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'appId': COMETCHAT_APP_ID!,
          'apiKey': COMETCHAT_REST_API_KEY!,
        },
        body: JSON.stringify(updates),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(`CometChat API error: ${JSON.stringify(error)}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error updating CometChat user:', error);
      throw error;
    }
  }

  async deleteUser(uid: string): Promise<any> {
    try {
      const response = await fetch(`${this.baseUrl}/users/${uid}`, {
        method: 'DELETE',
        headers: {
          'appId': COMETCHAT_APP_ID!,
          'apiKey': COMETCHAT_REST_API_KEY!,
        },
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(`CometChat API error: ${JSON.stringify(error)}`);
      }

      return { success: true };
    } catch (error) {
      console.error('Error deleting CometChat user:', error);
      throw error;
    }
  }

  async generateAuthToken(uid: string): Promise<string> {
    if (!this.isConfigured) {
      throw new Error('CometChat service is not configured');
    }

    const cached = this.tokenCache.get(uid);
    if (cached && cached.expiresAt > Date.now()) {
      console.log(`Using cached CometChat token for user ${uid}`);
      return cached.token;
    }

    try {
      const response = await fetch(`${this.baseUrl}/users/${uid}/auth_tokens`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'appId': COMETCHAT_APP_ID!,
          'apiKey': COMETCHAT_REST_API_KEY!,
        },
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(`CometChat auth token error: ${JSON.stringify(error)}`);
      }

      const data = await response.json();
      const token = data.data.authToken;

      this.tokenCache.set(uid, {
        token,
        expiresAt: Date.now() + this.TOKEN_CACHE_DURATION,
      });

      return token;
    } catch (error) {
      console.error('Error generating CometChat auth token:', error);
      throw error;
    }
  }

  async createGroup(groupId: string, groupName: string, groupType: 'public' | 'private' | 'password' = 'private'): Promise<any> {
    try {
      const response = await fetch(`${this.baseUrl}/groups`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'appId': COMETCHAT_APP_ID!,
          'apiKey': COMETCHAT_REST_API_KEY!,
        },
        body: JSON.stringify({
          guid: groupId,
          name: groupName,
          type: groupType,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        if (error.error?.code === 'ERR_GUID_ALREADY_EXISTS') {
          return { success: true, message: 'Group already exists' };
        }
        throw new Error(`CometChat API error: ${JSON.stringify(error)}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error creating CometChat group:', error);
      throw error;
    }
  }
}

export const cometChatService = new CometChatService();
