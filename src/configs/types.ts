import type { EStatus } from "./enum";

export type Course = {
    _id: string;
    name: string;
    slug: string;
    avt: string;
    description: string;
    minAge: number;
    maxAge: number;
    status: EStatus;
    createdAt: string;
    updatedAt: string;
};