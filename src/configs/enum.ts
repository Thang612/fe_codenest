export const EStatus = {
    Draft: 'draft',
    Public: 'public',
    Delete: 'delete',
} as const;

export const ERoles = {
    Admin: 'admin',
    Teacher: 'teacher',
    Student: 'student',
} as const;

export type EStatus = (typeof EStatus)[keyof typeof EStatus];