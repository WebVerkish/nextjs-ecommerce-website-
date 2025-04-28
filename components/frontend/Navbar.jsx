"use client"
import React from "react";
import SearchForm from "./SearchForm";
import Image from "next/image";
import Link from "next/link";
import logo from "../../public/logo.png";
import { ShoppingCart, User } from "lucide-react";
import ThemeSwitcher from "../ThemeSwitcher";
import HelpModal from "./HelpModal";
import CartCountIcon from "./CartCountIcon";
import { useSession } from "next-auth/react";
import Loading from "@/app/loading";
import UserAvatar from "../backoffice/UserAvatar";

export default function Navbar() {
  const {data:session,status} = useSession();
  if(status === "loading"){
    <Loading/>
  }
  return (
    <div className="bg-white dark:bg-slate-800">
      <div className="flex items-center justify-between py-3 max-w-6xl mx-auto px-8 gap-8">
        {/* Logo */}
        <Link className="" href="/">
          <Image src={logo} alt="Ecom World logo" className="w-24" />
        </Link>
        {/* SEARCH */}
        <div className="flex-grow">
          <SearchForm />
        </div>
        <div className="flex gap-4">
          {
            status==="unauthenticated"?(
              <Link href="/login" className="flex items-center space-x-1 text-green-800 dark:text-green-100">
            <User />
            <span>Login</span>
          </Link>
            ):(<UserAvatar user={session?.user}/>)
          }
          <HelpModal/>
          <CartCountIcon/>
        </div>
        <ThemeSwitcher></ThemeSwitcher>
      </div>
    </div>
  );
}
