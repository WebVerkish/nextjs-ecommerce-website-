import Image from 'next/image';
import React from 'react'

export default function ImageColumn({row,imageTitle}) {
    const imageUrl = row.getValue(`${imageTitle}`);
    return (
      <div className="shrink-0">
        <Image
          src={imageUrl}
          className="w-16 h-16 rounded-full object-cover"
          width={200}
          height={200}
          alt=""
        />
      </div>
    );
}
