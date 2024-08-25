import BreadcrumbNavigation from "@/components/breadcrumb-navigation";
import { NavLink } from "@/components/nav-link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { navigationRoutes } from "@/navigation-routes";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <>
      <header className="flex items-center justify-between gap-10 px-4 lg:px-10 border border-zinc-200">
        <Link
          href="/demos"
          className="py-4 text-2xl tracking-tight leading-6 font-extrabold text-gray-800"
        >
          <Image
            src="https://static.wixstatic.com/media/c8e520_a57bb8b1b8b64d5fae3313ea3653976b~mv2.png/v1/fill/w_175,h_34,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/Getdemo_MarcaGr%C3%A1fica_Principal_AzulEscuro.png"
            alt="Logo da Getdemo"
            width={175}
            height={34}
          />
        </Link>

        <nav className="hidden md:block flex-1 pl-6 border-l border-zinc-200">
          <ul className="flex gap-8">
            {navigationRoutes.map(link => (
              <li key={link.text}>
                <NavLink
                  href={link.path}
                  className="flex items-center gap-1 py-6 text-zinc-500 border-zinc-300 hover:border-b-2"
                  activeClassName="text-zinc-950 font-medium border-b-2 border-zinc-950"
                  disabled={"disabled" in link && !!link.disabled}
                >
                  {link.text}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2 p-3 ">
              Léo
              <ChevronDown width={20} height={20} />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuLabel className="flex flex-col">
              <span>Leonardo</span>

              <span className="font-normal text-zinc-500">
                leonardo0507.business@gmail.com
              </span>
            </DropdownMenuLabel>

            <DropdownMenuSeparator />

            <DropdownMenuItem>Perfil</DropdownMenuItem>
            <DropdownMenuItem>Sair</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>

      <div className="py-10 px-4 lg:px-10">
        <BreadcrumbNavigation />

        {children}
      </div>
    </>
  );
}
