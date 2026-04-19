'use client'

import { useState, useEffect } from 'react'
import { addToWishlist, removeFromWishlist, isProductInWishlist } from '@/app/actions/wishlist'

interface WishlistButtonProps {
  productId: string
  size?: 'sm' | 'md' | 'lg'
}

export default function WishlistButton({ productId, size = 'md' }: WishlistButtonProps) {
  const [isInWishlist, setIsInWishlist] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    const checkWishlist = async () => {
      try {
        const inWishlist = await isProductInWishlist(productId)
        setIsInWishlist(inWishlist)
      } catch (err) {
        console.error('Error checking wishlist:', err)
      } finally {
        setIsLoading(false)
      }
    }

    checkWishlist()
  }, [productId])

  const handleToggle = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    try {
      if (isInWishlist) {
        await removeFromWishlist(productId)
        setIsInWishlist(false)
      } else {
        await addToWishlist(productId)
        setIsInWishlist(true)
      }
    } catch (err) {
      console.error('Error toggling wishlist:', err)
    }
  }

  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
  }

  const iconSize = {
    sm: '16',
    md: '20',
    lg: '24',
  }

  if (isLoading) {
    return <div className={`${sizeClasses[size]} rounded-full bg-[#f0eded]`} />
  }

  return (
    <button
      onClick={handleToggle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`${sizeClasses[size]} rounded-full flex items-center justify-center transition-all duration-200 ${
        isInWishlist
          ? 'bg-[#fed488] text-[#775a19]'
          : 'bg-[#f0eded] text-[#74554b] hover:bg-[#e5e2e1]'
      } ${isHovered ? 'scale-110' : 'scale-100'}`}
      aria-label={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
    >
      <svg
        width={iconSize[size]}
        height={iconSize[size]}
        viewBox="0 0 24 24"
        fill={isInWishlist ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    </button>
  )
}
