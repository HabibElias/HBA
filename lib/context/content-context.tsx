"use client";
import { createContext, useContext, type ReactNode } from "react";
import type { PublicContent } from "@/lib/cms/public-types";
const Context = createContext<PublicContent | null>(null);
export function ContentProvider({value,children}:{value:PublicContent;children:ReactNode}) { return <Context.Provider value={value}>{children}</Context.Provider>; }
export function useContent() { const value=useContext(Context); if(!value) throw new Error("ContentProvider is required."); return value; }
