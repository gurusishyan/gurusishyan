export interface StudentDetails {
    user_name: string
    user_email: string
    password: string
    class_studying: string
    phone: number
    board_of_education_student: string
}

export interface TeacherDetails {
    user_name: string
    user_email: string
    password: string
    classes_handled: Array<string>
    teaching_sector: string
    phone: number
    board_of_education_teacher: string
    subjects_handled: Array<string>
    teacher: boolean
}

export interface UserDetails {
    user_name: string;
    user_id: string;
    user_email: string;
    user_role: string;
    createdAt: Date;
}