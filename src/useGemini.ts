/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef } from 'react';
import { GoogleGenAI, Type } from '@google/genai';

export function useGemini() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const ai = useRef(new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY }));

  const identifyMedicine = async (base64Image: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await ai.current.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: {
          parts: [
            {
              inlineData: {
                data: base64Image.split(',')[1],
                mimeType: 'image/jpeg',
              },
            },
            {
              text: `Identify this medicine from the image. Provide details in JSON format.
              Include: name, type, usage, dosage, warnings, sideEffects, expiryReminder, isSafe (boolean), confidence (0-1), description.
              Use Vietnamese for text fields.`,
            },
          ],
        },
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              name: { type: Type.STRING },
              type: { type: Type.STRING },
              usage: { type: Type.STRING },
              dosage: { type: Type.STRING },
              warnings: { type: Type.STRING },
              sideEffects: { type: Type.STRING },
              expiryReminder: { type: Type.STRING },
              isSafe: { type: Type.BOOLEAN },
              confidence: { type: Type.NUMBER },
              description: { type: Type.STRING },
            },
            required: ['name', 'type', 'usage', 'dosage', 'warnings', 'isSafe', 'description'],
          },
        },
      });

      return JSON.parse(response.text);
    } catch (err) {
      setError('Cần kết nối internet để nhận diện thuốc.');
      console.error(err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const analyzeSymptoms = async (base64Image?: string, description?: string) => {
    setLoading(true);
    setError(null);
    try {
      const parts: any[] = [];
      if (base64Image) {
        parts.push({
          inlineData: {
            data: base64Image.split(',')[1],
            mimeType: 'image/jpeg',
          },
        });
      }
      if (description) {
        parts.push({ text: description });
      }
      
      parts.push({
        text: `Analyze these symptoms or medical image. Provide a basic health assessment and first aid instructions in JSON format.
        Include: analysis, severity ('low', 'medium', 'high', 'emergency'), recommendation, firstAid.
        Use Vietnamese for text fields. Disclaimer: This is an AI assistant, consult a doctor immediately for emergencies.`,
      });

      const response = await ai.current.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: { parts },
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              analysis: { type: Type.STRING },
              severity: { type: Type.STRING },
              recommendation: { type: Type.STRING },
              firstAid: { type: Type.STRING },
            },
            required: ['analysis', 'severity', 'recommendation'],
          },
        },
      });

      return JSON.parse(response.text);
    } catch (err) {
      setError('Cần kết nối internet để phân tích triệu chứng.');
      console.error(err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const getVoiceResponse = async (query: string, language: string) => {
    try {
      const response = await ai.current.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: query,
        config: {
          systemInstruction: `You are a healthcare assistant for people in remote areas of Vietnam. 
          Provide short, simple, and helpful spoken responses in ${language === 'vi' ? 'Vietnamese' : language}.
          Keep it friendly and very easy to understand for elderly people.`,
        },
      });
      return response.text;
    } catch (err) {
      console.error(err);
      return null;
    }
  };

  return { identifyMedicine, analyzeSymptoms, getVoiceResponse, loading, error };
}
