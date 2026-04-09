import { ChevronDown, ChevronUp } from "lucide-react";
import React, { createContext, useContext, useState } from "react";

type CtxType = {
    active: string | null;
    setActive: (v: string) => void;
};

const AccordionCtx = createContext<CtxType | null>(null);

export const Accordion = ({
    children,
    defaultValue,
}: {
    children: React.ReactNode;
    defaultValue?: string;
}) => {
    const [active, setActive] = useState<string | null>(defaultValue || null);

    return (
        <AccordionCtx.Provider value={{ active, setActive }}>
            <div className="space-y-2">{children}</div>
        </AccordionCtx.Provider>
    );
};

// 👉 Item có context riêng (điểm quan trọng)
const ItemCtx = createContext<string>("");

export const AccordionItem = ({
    value,
    children,
}: {
    value: string;
    children: React.ReactNode;
}) => {
    return (
        <ItemCtx.Provider value={value}>
            <div className="border border-gray-500 rounded-md">{children}</div>
        </ItemCtx.Provider>
    );
};

export const AccordionTrigger = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const acc = useContext(AccordionCtx)!;
    const value = useContext(ItemCtx);

    const isOpen = acc.active === value;

    return (
        <button
            onClick={() => acc.setActive(isOpen ? '' : value)}
            className="w-full px-4 py-2  flex justify-between bg-bg rounded-md"
        >
            {children}
            <span>{isOpen ? <ChevronUp /> : <ChevronDown />}</span>
        </button>
    );
};

export const AccordionContent = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const acc = useContext(AccordionCtx)!;
    const value = useContext(ItemCtx);

    const isOpen = acc.active === value;

    if (!isOpen) return null;

    return <div className="p-4">{children}</div>;
};