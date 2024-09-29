import { MoreVertical, ChevronLast, ChevronFirst } from "lucide-react";
import { useContext } from "react";
import { createContext } from "react";
  // Use SidebarContext

export const SidebarContext = createContext();  

export default function Sidebar({ children }) {
  const { expanded, setExpanded } = useContext(SidebarContext);  // Use expanded from context

  return (
    <aside className="h-screen fixed z-10">
      <nav className="h-full flex flex-col bg-[#1F1E30] shadow-lg">
        <div className="p-4 pb-2 flex justify-between items-center">
          <img
            src="Laboratory.png"
            className={`overflow-hidden transition-all ${
              expanded ? "w-20" : "w-0"
            }`}
            alt="Laboratory logo"
          />
          <button
            onClick={() => setExpanded((curr) => !curr)}  // Toggle sidebar expand/collapse
            className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
          >
            {expanded ? <ChevronFirst /> : <ChevronLast />}
          </button>
        </div>
        <ul className="flex-1 px-3">{children}</ul>
      </nav>
    </aside>
  );
}
