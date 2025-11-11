import React from 'react'

export const BentoGrid = ({ children, className }) => {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}>
      {children}
    </div>
  )
}

export const BentoCard = ({ 
  children, 
  className, 
  color = 'blue',
  hover = true 
}) => {
  const colorClasses = {
    blue: 'from-blue-50 to-cyan-50 border-blue-200',
    emerald: 'from-emerald-50 to-green-50 border-emerald-200',
    indigo: 'from-indigo-50 to-blue-50 border-indigo-200',
    green: 'from-green-50 to-emerald-50 border-green-200',
    orange: 'from-orange-50 to-amber-50 border-orange-200',
    purple: 'from-purple-50 to-violet-50 border-purple-200',
    red: 'from-red-50 to-pink-50 border-red-200'
  }

  return (
    <div className={`
      relative rounded-3xl p-6 border-2 bg-gradient-to-br backdrop-blur-sm
      ${colorClasses[color]}
      ${hover ? 'transition-all duration-300 hover:scale-105 hover:shadow-2xl' : ''}
      ${className}
    `}>
      {children}
    </div>
  )
}