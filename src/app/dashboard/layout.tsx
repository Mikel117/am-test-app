import { SearchGrid } from "@/characters";
import { FavoritesDropdown } from "@/components";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard - Explorador de Personajes",
  description: "Explora, busca y descubre tus personajes favoritos de Rick and Morty. Navega por el universo completo de la serie.",
  alternates: {
    canonical: "/dashboard",
  },
  openGraph: {
    title: "Dashboard - Rick and Morty Explorer",
    description: "Explora, busca y descubre tus personajes favoritos de Rick and Morty.",
    url: "/dashboard",
  },
};

export default function DashboardLayout({children}: {children: React.ReactNode}) {
    return (
        <div className="dashboard-layout">
            <SearchGrid />
            {children}
            <div className="favorites-container">
                <FavoritesDropdown/>
            </div>
        </div>
    )
}