import { Database } from "@/utils/supabase/database.types"

type Answer = Database['public']['Tables']['practice_answers']['Row']
export const AnswerContainer = ({answers}: {answers: Answer[]}) => {
    return (
        <div>
            {answers.map(answer => )}
        </div>
    )
}

const AnswerItem = () => {
    return (
        <div>
            
        </div>
    )
}