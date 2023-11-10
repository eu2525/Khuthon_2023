export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      chat_analytic_reports: {
        Row: {
          chat_raw: string
          created_at: string
          evaluation: string | null
          id: number
          request_id: number
          score: number
          suggestion: string | null
        }
        Insert: {
          chat_raw: string
          created_at?: string
          evaluation?: string | null
          id?: number
          request_id: number
          score: number
          suggestion?: string | null
        }
        Update: {
          chat_raw?: string
          created_at?: string
          evaluation?: string | null
          id?: number
          request_id?: number
          score?: number
          suggestion?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "chat_analytic_reports_request_id_fkey"
            columns: ["request_id"]
            isOneToOne: false
            referencedRelation: "chat_analytic_requests"
            referencedColumns: ["id"]
          }
        ]
      }
      chat_analytic_requests: {
        Row: {
          chat_raw: string
          created_at: string
          id: number
          reported_at: string | null
          total_score: number | null
          user_id: string | null
        }
        Insert: {
          chat_raw: string
          created_at?: string
          id?: number
          reported_at?: string | null
          total_score?: number | null
          user_id?: string | null
        }
        Update: {
          chat_raw?: string
          created_at?: string
          id?: number
          reported_at?: string | null
          total_score?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "chat_analytic_requests_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      practice_answers: {
        Row: {
          answer: string
          created_at: string
          evaluation: string | null
          id: number
          question_id: number | null
          score: number | null
          suggestion: string | null
        }
        Insert: {
          answer: string
          created_at?: string
          evaluation?: string | null
          id?: number
          question_id?: number | null
          score?: number | null
          suggestion?: string | null
        }
        Update: {
          answer?: string
          created_at?: string
          evaluation?: string | null
          id?: number
          question_id?: number | null
          score?: number | null
          suggestion?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "practice_answers_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "practice_questions"
            referencedColumns: ["id"]
          }
        ]
      }
      practice_avatars: {
        Row: {
          age: number | null
          created_at: string
          gender: string | null
          id: number
          job: string | null
          name: string
          personality: string | null
          profile_image: string
        }
        Insert: {
          age?: number | null
          created_at?: string
          gender?: string | null
          id?: number
          job?: string | null
          name: string
          personality?: string | null
          profile_image: string
        }
        Update: {
          age?: number | null
          created_at?: string
          gender?: string | null
          id?: number
          job?: string | null
          name?: string
          personality?: string | null
          profile_image?: string
        }
        Relationships: []
      }
      practice_questions: {
        Row: {
          additional_prompt: string | null
          chat_raw: string | null
          created_at: string
          id: number
          is_active: boolean
          level: number
          question: string
          set_id: number | null
        }
        Insert: {
          additional_prompt?: string | null
          chat_raw?: string | null
          created_at?: string
          id?: number
          is_active?: boolean
          level?: number
          question: string
          set_id?: number | null
        }
        Update: {
          additional_prompt?: string | null
          chat_raw?: string | null
          created_at?: string
          id?: number
          is_active?: boolean
          level?: number
          question?: string
          set_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "practice_questions_set_id_fkey"
            columns: ["set_id"]
            isOneToOne: false
            referencedRelation: "practice_sets"
            referencedColumns: ["id"]
          }
        ]
      }
      practice_results: {
        Row: {
          created_at: string
          evaluation: string | null
          id: number
          score: number | null
          set_id: number | null
          suggestion: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          evaluation?: string | null
          id?: number
          score?: number | null
          set_id?: number | null
          suggestion?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          evaluation?: string | null
          id?: number
          score?: number | null
          set_id?: number | null
          suggestion?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "practice_results_set_id_fkey"
            columns: ["set_id"]
            isOneToOne: false
            referencedRelation: "practice_sets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "practice_results_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      practice_sets: {
        Row: {
          cover_image: string | null
          created_at: string
          description: string | null
          id: number
          is_active: boolean
          level: number
          thumbnail_image: string | null
          title: string
        }
        Insert: {
          cover_image?: string | null
          created_at?: string
          description?: string | null
          id?: number
          is_active?: boolean
          level?: number
          thumbnail_image?: string | null
          title: string
        }
        Update: {
          cover_image?: string | null
          created_at?: string
          description?: string | null
          id?: number
          is_active?: boolean
          level?: number
          thumbnail_image?: string | null
          title?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
