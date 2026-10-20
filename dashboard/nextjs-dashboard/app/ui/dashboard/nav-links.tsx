"use client"; // Necessário para gerenciar o estado do submenu (useState)

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation'; // Opcional: para detectar rota ativa
import {
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
  ChevronDownIcon, // Novo ícone para indicar o submenu
} from '@heroicons/react/24/outline';

// 1. Atualizamos a estrutura para aceitar uma propriedade opcional de 'submenu'
const links = [
  { name: 'Principal', href: '/dashboard', icon: HomeIcon },
  {
    name: 'OS',
    icon: DocumentDuplicateIcon,
    submenu: [
      { name: 'Criar Nova', href: '/dashboard/os/cadastrar' },
    ],
  },
  { name: 'Clientes', href: '/dashboard/clientes', icon: UserGroupIcon },
];

export default function NavLinks() {
  return (
    <>
      {links.map((link) => (
        <MenuRouteItem key={link.name} link={link} />
      ))}
    </>
  );
}

// 2. Criamos um subcomponente interno para isolar o estado de abertura de cada menu
function MenuRouteItem({ link }: { link: typeof links[number] }) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const LinkIcon = link.icon;

  // Se o item atual possuir um submenu
  if (link.submenu) {
    return (
      <div className="w-full flex flex-col">
        {/* Botão que ativa/desativa o submenu */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex h-[48px] w-full items-center justify-between gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:p-2 md:px-3"
        >
          <div className="flex items-center gap-2">
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </div>
          {/* Seta indicativa com rotação animada */}
          <ChevronDownIcon
            className={`w-4 hidden md:block transition-transform duration-200 ${
              isOpen ? 'rotate-180' : ''
            }`}
          />
        </button>

        {/* Container dos subitens */}
        <div
          className={`grid transition-all duration-200 ease-in-out ${
            isOpen ? 'grid-rows-[1fr] opacity-100 mt-1' : 'grid-rows-[0fr] opacity-0'
          }`}
        >
          <div className="overflow-hidden flex flex-col gap-1 md:pl-6">
            {link.submenu.map((subItem) => {
              const isActive = pathname === subItem.href;
              return (
                <Link
                  key={subItem.name}
                  href={subItem.href}
                  className={`flex h-[38px] items-center gap-2 rounded-md p-2 text-xs font-medium hover:bg-sky-50 hover:text-blue-600 ${
                    isActive ? 'bg-sky-100 text-blue-600' : 'bg-gray-50/50'
                  }`}
                >
                  <p className="hidden md:block">{subItem.name}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // Se NÃO possuir submenu, renderiza o Link padrão original
  const isActive = pathname === link.href;
  return (
    <Link
      href={link.href || '#'}
      className={`flex h-[48px] grow items-center justify-center gap-2 rounded-md p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3 ${
        isActive ? 'bg-sky-100 text-blue-600' : 'bg-gray-50'
      }`}
    >
      <LinkIcon className="w-6" />
      <p className="hidden md:block">{link.name}</p>
    </Link>
  );
}
