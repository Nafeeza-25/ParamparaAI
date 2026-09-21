'use client';
export function VideoCard({src,label,children}:{src:string;label:string;children?:React.ReactNode}){return <div className="videoFrame"><video src={src} controls playsInline aria-label={label}/><span className="videoTag">{label}</span>{children}</div>}
