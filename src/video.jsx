import React from 'react';
import {AbsoluteFill, Audio, Sequence, interpolate, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {ThreeCanvas} from '@remotion/three';
import {useThree} from '@react-three/fiber';

const scenes = [
 {start:0, audio:0.8, label:'01 / THE SILENCE', title:['A world','without birds.'], accent:'#e4b873', bg:'#152d35'},
 {start:9.7, audio:9.7, label:'02 / THE RIPPLE EFFECT', title:['Insects','multiply.'], accent:'#e8bd79', bg:'#302b24'},
 {start:20.6, audio:20.6, label:'03 / THE FORESTS', title:['Seeds stop','travelling.'], accent:'#b8d7ac', bg:'#1c3430'},
 {start:31, audio:31, label:'04 / THE CLEANUP', title:['Nature loses','its cleaners.'], accent:'#e4bb93', bg:'#352c2b'},
 {start:40, audio:40, label:'05 / THE BALANCE', title:['Food webs','shift.'], accent:'#a5cde0', bg:'#1b3039'},
 {start:49, audio:49, label:'06 / THE CHOICE', title:['Keep the','sky alive.'], accent:'#d8dfac', bg:'#203a34'},
];
const captions = [
 [0.8,3.8,'Imagine waking up to a world without birds.'],[3.8,5.45,'No dawn chorus.'],[5.45,6.9,'No wings against the sky.'],[6.9,9.5,'The silence is only the beginning.'],
 [9.7,12.2,'First, insects could surge.'],[12.2,16.4,'Many birds eat vast numbers of insects,'],[16.4,20.5,'helping keep populations in check. Without them, crops and forests would face greater pressure.'],
 [20.6,23.0,'Then, plants would feel the loss.'],[23.0,27.1,'Some depend on birds to carry pollen or spread seeds.'],[27.1,30.8,'Their forests could slowly change, and struggle to renew.'],
 [31,33.9,'Scavenger birds clean up carcasses.'],[33.9,38.9,'Without them, decay would linger longer, and the risk of disease could rise in some places.'],
 [40,43.9,'From oceans to cities, food webs would shift.'],[43.9,48.0,'Predators would lose their prey, and ecosystems would have to find a new balance.'],
 [49,52.8,'A world without birds would be quieter, but also more fragile.'],[52.8,57.2,'Protect their habitats today, and keep the sky alive tomorrow.'],
];

// Lighting adapted from the installed remotion-3d-skill's DioramaSunlight rig.
function Sunlight() { return <><directionalLight position={[8,14,10]} intensity={2.2} color="#fff2d9"/><ambientLight intensity={0.8} color="#dce9dc"/><hemisphereLight args={['#e7f7ff','#72644d',0.8]}/><directionalLight position={[-8,3,-6]} intensity={1.3} color="#86c4d5"/></>; }
function Camera({frame}) { const {camera}=useThree(); const a=Math.sin(frame/210)*0.12; camera.position.set(8+a,6.7,12-Math.sin(frame/260)*0.25); camera.lookAt(0,1,0); camera.updateProjectionMatrix(); return null; }
function Tree({position=[0,0,0],scale=1, color='#668f6b'}) { return <group position={position} scale={scale}><mesh position={[0,0.7,0]}><cylinderGeometry args={[0.12,0.18,1.4,7]}/><meshStandardMaterial color="#82624a" flatShading/></mesh><mesh position={[0,1.65,0]}><icosahedronGeometry args={[0.85,1]}/><meshStandardMaterial color={color} flatShading roughness={1}/></mesh><mesh position={[0.35,1.38,0.05]}><icosahedronGeometry args={[0.52,0]}/><meshStandardMaterial color={color} flatShading/></mesh></group>; }
function Bird({position=[0,0,0],scale=1,frame=0,color='#252c2d'}) { const flap=Math.sin(frame/6)*0.4; return <group position={position} scale={scale}><mesh rotation={[0,0,-0.12]}><sphereGeometry args={[0.2,8,6]}/><meshStandardMaterial color={color}/></mesh><mesh position={[0.33,0.04,0]} rotation={[0,0,flap+0.25]}><coneGeometry args={[0.13,0.7,4]}/><meshStandardMaterial color={color}/></mesh><mesh position={[-0.33,0.04,0]} rotation={[0,0,-flap-0.25]}><coneGeometry args={[0.13,0.7,4]}/><meshStandardMaterial color={color}/></mesh></group>; }
function Bug({position,scale=1,frame=0}) {return <group position={position} scale={scale} rotation={[0,frame/80,0]}><mesh><sphereGeometry args={[0.22,10,8]}/><meshStandardMaterial color="#d9a854" metalness={0.15} roughness={0.45}/></mesh><mesh position={[0,0.1,-0.18]}><sphereGeometry args={[0.13,8,6]}/><meshStandardMaterial color="#292e28"/></mesh>{[-1,1].map((s)=><mesh key={s} position={[s*0.26,-0.06,0]} rotation={[0,0,s*0.8]}><cylinderGeometry args={[0.018,0.018,0.38,5]}/><meshStandardMaterial color="#292e28"/></mesh>)}</group>}
function Flower({position,scale=1}) {return <group position={position} scale={scale}><mesh position={[0,0.2,0]}><cylinderGeometry args={[.025,.025,.4,6]}/><meshStandardMaterial color="#7b9b67"/></mesh>{[0,1,2,3,4].map(i=><mesh key={i} position={[Math.cos(i*1.26)*.1,0.43,Math.sin(i*1.26)*.1]}><sphereGeometry args={[.09,7,6]}/><meshStandardMaterial color="#eed4ad"/></mesh>)}<mesh position={[0,.45,0]}><sphereGeometry args={[.07,7,6]}/><meshStandardMaterial color="#eab969"/></mesh></group>}
const trees = [[-2.2,0,-.8,.8],[1.6,0,-1.1,.95],[-.7,0,-1.7,.7],[2.5,0,.3,.65],[-2.5,0,1.1,.65]];
function Diorama({scene,frame}) { const colors=['#678b76','#9b8e60','#678d72','#897b67','#578e94','#6c9c78']; const s=scene; return <group position={[1.4,-0.3,0]} rotation={[0,Math.sin(frame/180)*.08,0]}>
  <mesh position={[0,-.42,0]}><cylinderGeometry args={[3.45,3.0,.8,48]}/><meshStandardMaterial color="#4a5144" flatShading/></mesh>
  <mesh position={[0,0,0]}><cylinderGeometry args={[3.45,3.45,.12,48]}/><meshStandardMaterial color={colors[s]} flatShading roughness={1}/></mesh>
  <mesh position={[0,-.81,0]}><cylinderGeometry args={[2.95,2.7,.12,48]}/><meshStandardMaterial color="#b89466"/></mesh>
  {(s===0||s===2||s===5) && trees.map(([x,y,z,sc],i)=><Tree key={i} position={[x,y,z]} scale={sc} color={s===2?'#739b76':'#71977b'}/>)}
  {s===1 && <>{Array.from({length:22},(_,i)=><mesh key={i} position={[(i%7-3)*.64,.25,Math.floor(i/7)*.65-1.05]} rotation={[0,0,(i%3-1)*.15]}><coneGeometry args={[.12,.5,5]}/><meshStandardMaterial color={i%2?'#c5b577':'#a9a671'}/></mesh>)}{Array.from({length:9},(_,i)=><Bug key={i} position={[(i%3-1)*1.05,1.05+(i%2)*.5,Math.floor(i/3)*.75-1]} frame={frame+i*9} scale={.8}/>)}</>}
  {s===2 && <>{Array.from({length:12},(_,i)=><Flower key={i} position={[(i%4-1.5)*.78,.06,Math.floor(i/4)*.75-.7]} scale={.9}/>)}<mesh position={[.5,1.15,.3]}><icosahedronGeometry args={[.18,1]}/><meshStandardMaterial color="#e7b367"/></mesh></>}
  {s===3 && <><mesh position={[0,.28,0]} rotation={[0,0,.25]}><sphereGeometry args={[.7,8,6]}/><meshStandardMaterial color="#8f7767" flatShading/></mesh><mesh position={[.6,.22,0]}><sphereGeometry args={[.28,8,6]}/><meshStandardMaterial color="#ab8e78" flatShading/></mesh>{[-1,1].map((v,i)=><mesh key={i} position={[v*1.5,.13,-.6]}><dodecahedronGeometry args={[.38,0]}/><meshStandardMaterial color="#a59a83" flatShading/></mesh>)}</>}
  {s===4 && <><mesh position={[0,.16,0]}><sphereGeometry args={[1.25,32,20]}/><meshStandardMaterial color="#4f8c99" roughness={.8}/></mesh>{[[-.55,.65,.92],[.42,.84,.85],[.75,-.05,1.05],[-.9,-.1,.75]].map(([x,y,z],i)=><mesh key={i} position={[x,y,z]} rotation={[.4,0,i]}><sphereGeometry args={[.4,7,5]}/><meshStandardMaterial color="#97ae85" flatShading/></mesh>)}{[[-2.1,-.7],[-1.7,-1.1],[1.8,-.8],[2.1,.1]].map(([x,z],i)=><mesh key={i} position={[x,.5,z]}><boxGeometry args={[.45,1+i*.2,.45]}/><meshStandardMaterial color="#a6aaa0"/></mesh>)}</>}
  {(s===0||s===5) && [0,1,2,3,4].map(i=>{const fade=s===0?interpolate(frame,[80,200],[1,0],{extrapolateLeft:'clamp',extrapolateRight:'clamp'}):1; return <Bird key={i} position={[-1.8+i*.9,2.9+Math.sin(i*3+frame/35)*.28,-1+i*.27]} scale={.65*fade} frame={frame+i*4}/>})}
  {s===5 && Array.from({length:7},(_,i)=><Flower key={i} position={[(i%4-1.5)*.65,.06,Math.floor(i/4)*1.1+.15]}/>)}
 </group> }

export function Birds(){ const frame=useCurrentFrame(); const {fps,width,height}=useVideoConfig(); const time=frame/fps; const idx=Math.max(0,scenes.findLastIndex(s=>time>=s.start)); const scene=scenes[idx]; const local=frame-scene.start*fps; const opacity=interpolate(local,[0,12],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'}); const caption=captions.find(([a,b])=>time>=a&&time<b); return <AbsoluteFill style={{background:scene.bg,color:'#f6f3e9',fontFamily:'Arial, sans-serif',overflow:'hidden'}}>
 <AbsoluteFill style={{background:`radial-gradient(ellipse at 72% 39%, ${scene.accent}33 0%, transparent 42%), linear-gradient(120deg, ${scene.bg}, #14222a)`}}/>
 <ThreeCanvas width={width} height={height} camera={{position:[8,6.7,12],fov:35,near:.1,far:100}}><Camera frame={frame}/><Sunlight/><Diorama scene={idx} frame={frame}/></ThreeCanvas>
 <AbsoluteFill style={{background:'linear-gradient(90deg, rgba(15,26,29,.86) 0%, rgba(15,26,29,.48) 30%, transparent 65%), linear-gradient(0deg, rgba(10,20,22,.73), transparent 32%)'}}/>
 <div style={{position:'absolute',top:34,left:45,right:45,display:'flex',justifyContent:'space-between',alignItems:'center',fontSize:10,letterSpacing:3.2,fontWeight:700,color:'#dedfce'}}><span>FIELD NOTES <span style={{color:scene.accent}}> / </span> EARTH</span><span>AN ECOLOGICAL WHAT IF</span></div>
 <div style={{position:'absolute',left:47,top:141,opacity}}><div style={{fontSize:11,letterSpacing:3,fontWeight:700,color:scene.accent,marginBottom:22}}>{scene.label}</div><div style={{fontFamily:'Georgia, serif',fontSize:51,lineHeight:1.02,letterSpacing:-1.8}}>{scene.title[0]}<br/><span style={{fontStyle:'italic',color:scene.accent}}>{scene.title[1]}</span></div><div style={{height:1,width:57,background:scene.accent,marginTop:24}}/></div>
 {caption&&<div style={{position:'absolute',bottom:57,left:160,right:160,textAlign:'center',fontSize:19,lineHeight:1.35,fontWeight:600,textShadow:'0 2px 8px #000',color:'#fff'}}>{caption[2]}</div>}
 <div style={{position:'absolute',bottom:25,left:47,right:47,display:'flex',alignItems:'center',gap:14,color:'#d2d8ce',fontSize:10,letterSpacing:1.5}}><span>THE WORLD WITHOUT BIRDS</span><div style={{flex:1,height:1,background:'#ffffff40'}}><div style={{width:`${time/60*100}%`,height:2,background:scene.accent}}/></div><span>{String(Math.floor(time)).padStart(2,'0')} / 60</span></div>
 {scenes.map((s,i)=><Sequence key={i} from={Math.round(s.audio*fps)}><Audio src={staticFile(`audio/0${i+1}.mp3`)} volume={0.72}/></Sequence>)}
 </AbsoluteFill> }
