import { SearchGrid } from "@/characters";
import { FavoritesDropdown } from "@/components";

export default function DashboardLayout({children}: {children: React.ReactNode}) {
    return (
        <div className="dashboard-layout">
            <SearchGrid />
            {children}
            <FavoritesDropdown/>
        </div>
    )
}