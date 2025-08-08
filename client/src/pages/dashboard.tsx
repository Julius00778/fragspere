import { useState, ReactNode } from "react";
import {
  Home,
  Compass,
  Star,
  Users,
  MessageCircle,
  Trophy,
  Calendar,
  Flame,
  Bell,
  Menu,
  Sun,
  Moon,
  Search,
} from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface NavItemProps {
  icon: ReactNode;
  label: string;
  active?: boolean;
}

function NavItem({ icon, label, active }: NavItemProps) {
  return (
    <div
      className={`flex items-center gap-3 px-3 py-2 rounded-md cursor-pointer hover:bg-neutral-700 transition ${
        active ? "text-red-400 bg-neutral-700 shadow-inner" : "text-gray-300"
      }`}
    >
      {icon}
      <span className="hidden lg:block">{label}</span>
    </div>
  );
}

interface SectionProps {
  title: string;
  children: ReactNode;
}

function Section({ title, children }: SectionProps) {
  return (
    <div>
      <h4 className="uppercase text-gray-500 text-xs mb-2">{title}</h4>
      <div className="space-y-1">{children}</div>
    </div>
  );
}

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  const toggleSidebar = () => setSidebarOpen((o) => !o);
  const toggleTheme = () => setDarkMode((d) => !d);

  return (
    <div
      className={`min-h-screen flex ${
        darkMode ? "bg-neutral-900 text-white" : "bg-white text-neutral-900"
      }`}
    >
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 w-60 bg-neutral-800 p-4 space-y-8 transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform md:translate-x-0 md:relative md:flex md:flex-col`}
      >
        <nav className="space-y-6">
          <Section title="Menu">
            <NavItem icon={<Home size={20} />} label="Home" active />
            <NavItem icon={<Compass size={20} />} label="Feed" />
            <NavItem icon={<Star size={20} />} label="Favourite" />
          </Section>

          <Section title="Discover">
            <NavItem icon={<Compass size={20} />} label="Explore" />
            <NavItem icon={<Users size={20} />} label="Friends" />
            <NavItem icon={<MessageCircle size={20} />} label="Chat Rooms" />
            <NavItem icon={<Compass size={20} />} label="Social" />
          </Section>

          <Section title="Tournaments">
            <NavItem icon={<Trophy size={20} />} label="Join/Host" />
            <NavItem icon={<Trophy size={20} />} label="Leaderboard" />
            <NavItem icon={<Calendar size={20} />} label="Calendar" />
          </Section>

          <Section title="Fun">
            <NavItem icon={<Flame size={20} />} label="Chaos Feed" />
          </Section>
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col md:ml-60">
        {/* Navbar */}
        <header className="flex items-center justify-between px-4 py-3 bg-neutral-800 shadow-md sticky top-0 z-10">
          <div className="flex items-center gap-2">
            <button className="md:hidden" onClick={toggleSidebar} aria-label="Toggle menu">
              <Menu />
            </button>
            <div className="flex items-center gap-2 font-bold text-xl">
              <div className="w-8 h-8 bg-red-500 rounded flex items-center justify-center">
                GG
              </div>
              Gamersgram
            </div>
          </div>

          <div className="flex-1 px-4">
            <div className="max-w-md mx-auto relative">
              <input
                type="search"
                placeholder="Search..."
                className="w-full rounded-full bg-neutral-700 px-4 py-2 focus:outline-none"
              />
              <Search className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="bg-yellow-400 text-black px-4 py-2 rounded-md font-semibold hover:bg-yellow-300 transition">
              POST
            </button>
            <Bell />
            <button
              onClick={toggleTheme}
              className="p-2 rounded-md bg-neutral-700 hover:bg-neutral-600 transition"
              aria-label="Toggle theme"
            >
              {darkMode ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <Avatar className="w-8 h-8">
              <AvatarImage src="https://api.dicebear.com/7.x/bottts/svg?seed=player" />
              <AvatarFallback>GG</AvatarFallback>
            </Avatar>
          </div>
        </header>

        {/* Content */}
        <main className="p-4 grid lg:grid-cols-3 gap-6">
          <section className="lg:col-span-2 space-y-6">
            <div className="h-48 bg-neutral-800 rounded-lg flex items-center justify-center">
              Hero Carousel
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-neutral-800 rounded-lg p-4">Popular Creators</div>
              <div className="bg-neutral-800 rounded-lg p-4">Most Popular Games</div>
            </div>
          </section>

          <aside className="space-y-6">
            <div className="bg-neutral-800 rounded-lg p-4">
              <h3 className="font-semibold mb-4">Streaming Now</h3>
              <div className="flex -space-x-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Avatar
                    key={i}
                    className="w-10 h-10 border-2 border-neutral-800"
                  >
                    <AvatarImage
                      src={`https://api.dicebear.com/7.x/bottts/svg?seed=streamer${i}`}
                    />
                    <AvatarFallback>SN</AvatarFallback>
                  </Avatar>
                ))}
              </div>
            </div>
          </aside>
        </main>
      </div>

      {/* AI Assistant Button */}
      <button className="fixed bottom-6 right-6 bg-red-600 p-4 rounded-full shadow-lg hover:bg-red-500 transition">
        🤖
      </button>
    </div>
  );
}

