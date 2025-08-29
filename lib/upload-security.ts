import { NextRequest } from 'next/server';
import { fileUploadSchema } from './validation-schemas';

export class UploadSecurity {
  private static readonly ALLOWED_MIME_TYPES = [
    'image/jpeg',
    'image/png',
    'image/webp',
    'application/pdf',
    'text/plain',
  ];

  private static readonly MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

  static validateFile(file: File): { valid: boolean; error?: string } {
    // Check file size
    if (file.size > this.MAX_FILE_SIZE) {
      return { valid: false, error: 'File too large' };
    }

    // Check MIME type
    if (!this.ALLOWED_MIME_TYPES.includes(file.type)) {
      return { valid: false, error: 'Invalid file type' };
    }

    // Check file extension matches MIME type
    const extension = file.name.split('.').pop()?.toLowerCase();
    if (!this.isValidExtension(extension, file.type)) {
      return { valid: false, error: 'File extension does not match content type' };
    }

    return { valid: true };
  }

  private static isValidExtension(extension: string | undefined, mimeType: string): boolean {
    const validExtensions: Record<string, string[]> = {
      'image/jpeg': ['jpg', 'jpeg'],
      'image/png': ['png'],
      'image/webp': ['webp'],
      'application/pdf': ['pdf'],
      'text/plain': ['txt'],
    };

    return extension ? validExtensions[mimeType]?.includes(extension) ?? false : false;
  }

  static sanitizeFilename(filename: string): string {
    // Remove dangerous characters and limit length
    return filename
      .replace(/[^a-zA-Z0-9.-]/g, '_')
      .substring(0, 100);
  }
}