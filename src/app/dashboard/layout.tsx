import { SearchGrid } from "@/characters";

export default function DashboardLayout({children}: {children: React.ReactNode}) {
    return (
        <div className="dashboard-layout">
            <SearchGrid />
            {children}
        </div>
    )
}