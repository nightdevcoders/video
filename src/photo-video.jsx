import React from 'react';
import {AbsoluteFill, Audio, Img, Sequence, interpolate, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {captions} from './captions';

const starts = [0, 9.7, 20.6, 31, 40, 49];
const audioStarts = [0.8, 9.7, 20.6, 31, 40, 49];
const clamp = {extrapolateLeft:'clamp', extrapolateRight:'clamp'};

export function PhotoVideo() {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const time = frame / fps;
  const caption = captions.find(([start, end]) => time >= start && time < end);
  const titleOpacity = interpolate(time, [0.2, 1, 3.1, 4.0], [0, 1, 1, 0], clamp);
  const finalOpacity = interpolate(time, [57.2, 58, 59.5, 60], [0, 1, 1, 0], clamp);
  return <AbsoluteFill style={{backgroundColor:'#080f11', color:'white', fontFamily:'Arial, sans-serif', overflow:'hidden'}}>
    {starts.map((start, i) => {
      const end = starts[i+1] ?? 60;
      if (time < start || (i < starts.length-1 && time > end + 1)) return null;
      const progress = interpolate(time, [start, end], [0, 1], clamp);
      const opacity = i === 0 ? 1 : interpolate(time, [start, start + .85], [0, 1], clamp);
      const zoom = i % 2 === 0 ? 1.04 + progress * .10 : 1.14 - progress * .08;
      const pan = (i % 2 === 0 ? 1 : -1) * (progress - .5) * 2.5;
      return <AbsoluteFill key={i} style={{opacity, overflow:'hidden'}}>
        <Img src={staticFile(`keyframes/0${i+1}.png`)} style={{width:'100%', height:'100%', objectFit:'cover', transform:`scale(${zoom}) translateX(${pan}%)`}} />
      </AbsoluteFill>;
    })}
    <AbsoluteFill style={{background:'linear-gradient(to bottom, rgba(3,10,13,.42), transparent 29%, transparent 54%, rgba(3,10,13,.7))'}} />
    <div style={{position:'absolute', top:75, left:90, right:90, textAlign:'center', opacity:titleOpacity, textShadow:'0 3px 20px #000'}}>
      <div style={{fontSize:19, fontWeight:700, letterSpacing:6, color:'#e7d1a1', marginBottom:16}}>A WORLD WITHOUT BIRDS</div>
      <div style={{fontFamily:'Georgia, serif', fontSize:55, lineHeight:1.1}}>What if they all disappeared?</div>
    </div>
    {caption && <div style={{position:'absolute', bottom:72, left:100, right:100, display:'flex', justifyContent:'center'}}>
      <div style={{maxWidth:960, padding:'13px 23px', background:'rgba(0, 0, 0, .56)', borderRadius:7, fontSize:30, lineHeight:1.28, fontWeight:600, textAlign:'center', textShadow:'0 2px 4px #000'}}>{caption[2]}</div>
    </div>}
    <div style={{position:'absolute', left:70, right:70, bottom:27, height:2, background:'rgba(255,255,255,.23)'}}><div style={{height:'100%', width:`${Math.min(100,time/60*100)}%`, background:'#e5d2a4'}} /></div>
    <div style={{position:'absolute', left:0, right:0, top:'45%', textAlign:'center', opacity:finalOpacity, fontFamily:'Georgia, serif', fontSize:48, textShadow:'0 3px 18px #000'}}>Keep the sky alive.</div>
    {audioStarts.map((start, i) => <Sequence key={i} from={Math.round(start * fps)}><Audio src={staticFile(`audio/0${i+1}.mp3`)} volume={0.72} /></Sequence>)}
  </AbsoluteFill>;
}
