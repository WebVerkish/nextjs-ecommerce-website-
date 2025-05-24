"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import logo from "../../public/logo.png";
import {
  Boxes,
  Building2,
  ChevronDown,
  ChevronRight,
  CircleDollarSign,
  ExternalLink,
  File,
  LayoutGrid,
  LayoutList,
  LogOut,
  MonitorPlay,
  ScanSearch,
  SendToBack,
  Settings,
  Slack,
  Tractor,
  Truck,
  User,
  Users2,
  Warehouse,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { signOut, useSession } from "next-auth/react";
import Loading from "@/app/loading";
import handleLogout from "@/lib/handlelogout";

export default function Sidebar({ showSidebar, setShowSidebar }) {
  const router = useRouter();
  const { data: session, status } = useSession();
  if (status === "loading") {
    <Loading />;
  }

  async function handleLogout() {
    await signOut();
    router.push("/");
  }
  const role = session?.user?.role;

  const pathName = usePathname();
  let siderbarLinks = [
    {
      title: "Customers",
      icon: Users2,
      href: "/dashboard/customers",
    },
    {
      title: "Markets",
      icon: Warehouse,
      href: "/dashboard/markets",
    },
    {
      title: "Farmers",
      icon: Tractor,
      href: "/dashboard/farmers",
    },
    {
      title: "Orders",
      icon: Truck,
      href: "/dashboard/orders",
    },
    {
      title: "Our Staff",
      icon: User,
      href: "/dashboard/staff",
    },
    {
      title: "Ecom Community",
      icon: Building2,
      href: "/dashboard/community",
    },
    {
      title: "Wallet",
      icon: CircleDollarSign,
      href: "/dashboard/wallet",
    },
    {
      title: "Settings",
      icon: Settings,
      href: "/dashboard/settings",
    },
    {
      title: "Online Store",
      icon: ExternalLink,
      href: "/",
    },
  ];
  let catalogueLinks = [
    {
      title: "Products",
      icon: Boxes,
      href: "/dashboard/products",
    },
    {
      title: "Categories",
      icon: LayoutList,
      href: "/dashboard/categories",
    },
    {
      title: "Coupons",
      icon: ScanSearch,
      href: "/dashboard/coupons",
    },
    {
      title: "Store Banners",
      icon: MonitorPlay,
      href: "/dashboard/sliders",
    },
  ];
  const [openSubMenu, setOpenSubMenu] = useState(false);
  if (role === "FARMER") {
    siderbarLinks = [
      {
        title: "Sales",
        icon: Truck,
        href: "/dashboard/sales",
      },
      {
        title: "Wallet",
        icon: CircleDollarSign,
        href: "/dashboard/wallet",
      },
      {
        title: "Settings",
        icon: Settings,
        href: "/dashboard/settings",
      },
      {
        title: "Online Store",
        icon: ExternalLink,
        href: "/",
      },
    ];
    catalogueLinks = [
      {
        title: "Products",
        icon: Boxes,
        href: "/dashboard/products",
      },
      {
        title: "Coupons",
        icon: ScanSearch,
        href: "/dashboard/coupons",
      },
    ];
  }
  if (role === "USER") {
    siderbarLinks = [
      {
        title: "My Orders",
        icon: Truck,
        href: "/dashboard/orders",
      },
      {
        title: "Sales",
        icon: Truck,
        href: "/dashboard/sales",
      },
      {
        title: "Profile",
        icon: Truck,
        href: "/dashboard/profile",
      },
      {
        title: "Online Store",
        icon: ExternalLink,
        href: "/",
      },
    ];
    catalogueLinks = [];
  }

  return (
    <div
      className={
        showSidebar
          ? "sm:block mt-20 sm:mt-0 bg-white dark:bg-slate-800 space-y-6 w-64 h-screen dark:text-slate-300 text-slate-800 fixed left-0 top-0 shadow-md overflow-y-auto"
          : "mt-20 sm:mt-0 hidden sm:block bg-white dark:bg-slate-800 space-y-6 w-64 h-screen dark:text-slate-300 text-slate-800 fixed left-0 top-0 shadow-md overflow-y-auto"
      }
    >
      <Link
        onClick={() => setShowSidebar(false)}
        className=" px-6 py-4"
        href="/dashboard"
      >
        <Image
          src={logo}
          alt="ecoworld"
          width={200}
          height={200}
          className="w-36 "
        />
      </Link>
      <div className="space-y-3 flex flex-col mt-14">
        <Link
          onClick={() => setShowSidebar(false)}
          href="/dashboard"
          className={
            pathName === "/dashboard"
              ? "flex items-center space-x-3 px-6 py-2 border-l-4 border-lime-500 text-lime-500"
              : "flex items-center space-x-3 px-6 py-2"
          }
        >
          <LayoutGrid />
          <span>Dashboard</span>
        </Link>
        {catalogueLinks.length > 0 && (
          <Collapsible className="px-6 py-2">
            <CollapsibleTrigger
              className=""
              onClick={() => setOpenSubMenu(!openSubMenu)}
            >
              <button href="/" className="flex items-center space-x-6 py-2">
                <div className="flex space-x-3">
                  <Slack />
                  <span>Catalogue</span>
                </div>
                {openSubMenu ? <ChevronDown /> : <ChevronRight />}
              </button>
            </CollapsibleTrigger>

            <CollapsibleContent className="px-4 pl-6 py-2 bg-slate-100 shadow-md dark:bg-slate-800 text-slate-800 dark:text-slate-50 rounded-lg">
              {catalogueLinks.map((item, i) => {
                return (
                  <Link
                    onClick={() => setShowSidebar(false)}
                    key={i}
                    href={item.href}
                    className={
                      pathName === item.href
                        ? "flex items-center space-x-3 text-sm py-1 border-lime-500 text-lime-500"
                        : "flex items-center text-sm space-x-3 py-1"
                    }
                  >
                    <item.icon className="w-4 h-4" />
                    <span>{item.title}</span>
                  </Link>
                );
              })}
            </CollapsibleContent>
          </Collapsible>
        )}

        {siderbarLinks.map((item, i) => {
          const Icon = item.icon;
          return (
            <Link
              onClick={() => setShowSidebar(false)}
              key={i}
              href={item.href}
              className={
                item.href == pathName
                  ? "flex items-center space-x-3 px-6 py-2 border-l-4 border-lime-500 text-lime-500"
                  : "flex items-center space-x-3 px-6 py-2"
              }
            >
              <Icon />
              <span>{item.title}</span>
            </Link>
          );
        })}
        <div className="px-6 py-2">
          <button
            onClick={handleLogout}
            className="bg-lime-600 flex items-center space-x-3 text-white py-3 px-6 rounded-md"
          >
            <LogOut />
            <span>Log Out</span>
          </button>
        </div>
      </div>
    </div>
  );
}
