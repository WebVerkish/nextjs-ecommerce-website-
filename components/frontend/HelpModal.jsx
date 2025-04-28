"use client";

import { Button, Modal } from "flowbite-react";
import { CornerDownLeft, Headphones, HelpCircle, MessageSquare, Truck } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function HelpModal() {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpenModal(true)}
        className="flex justify-center items-center space-x-2 text-green-800  dark:text-green-100"
      >
        <HelpCircle />
        <span>Help</span>
      </button>
      <Modal show={openModal} onClose={() => setOpenModal(false)} className="max-w-7xl mx-auto">
        <Modal.Header>Need Help with Shopping, Talk to our Desk</Modal.Header>
        <Modal.Body>
          <div className="grid grid-cols-2 gap-6">
            <Link
              href="tel:1234567890"
              className="flex justify-center items-center space-x-2 text-green-800  dark:text-green-100"
            >
              <div className="flex items-center w-10 h-10 bg-lime-100 justify-center rounded-full text text-lime-800  ">
                <Headphones className="w-6 h-6" />
              </div>
              <span>Call :- 1234567890</span>
            </Link>
            <Link
              href="/track"
              className="flex justify-center items-center space-x-2 text-green-800  dark:text-green-100"
            >
              <div className="flex items-center w-10 h-10 bg-lime-100 justify-center rounded-full text text-lime-800  ">
                <Truck className="w-6 h-6" />
              </div>
              <span>Track Your Order</span>
            </Link>
            <Link
              href="/return-and-refunds"
              className="flex justify-center items-center space-x-2 text-green-800  dark:text-green-100"
            >
              <div className="flex items-center w-10 h-10 bg-lime-100 justify-center rounded-full text text-lime-800  ">
                <CornerDownLeft className="w-6 h-6" />
              </div>
              <span>Returns and Refunds</span>
            </Link>
            <Link
              href="/"
              className="flex justify-center items-center space-x-2 text-green-800  dark:text-green-100"
            >
              <div className="flex items-center w-10 h-10 bg-lime-100 justify-center rounded-full text text-lime-800  ">
                <MessageSquare className="w-6 h-6" />
              </div>
              <span>Chat With Us</span>
            </Link>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
