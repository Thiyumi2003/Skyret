// import { useRef, useState } from "react";

// export default function TestPage() {

// 	const videoRef = useRef(null);
// 	const [buttonText, setButtonText] = useState("Play")

// 	return (
// 		<div className="w-full h-screen flex justify-center  bg-primary text-secondary flex-col gap-10 ">
			
// 			<div className="w-[400px] h-[400px] bg-red-900 rounded-full rounded-tr-none border-12 overflow-hidden relative justify-center items-center flex">
// 				<video ref={videoRef} autoPlay src="/1080p.mp4" className="w-full h-full object-cover"/>
// 				<button

// 				onClick={
// 					()=>{
// 						if(videoRef.current.paused){
// 							videoRef.current.play()
// 							setButtonText("Pause")
// 						}else{
// 							videoRef.current.pause()
// 							setButtonText("Play")
// 						}
						
// 					}
// 				}


// 				className="bg-sky-50 p-5 rounded-lg absolute">
// 					{buttonText}
// 				</button>
// 			</div>
			
// 		</div>
// 	);
// }
// import { useState } from "react";
// import uploadMedia from "../utils/mediaUpload";


// export default function TestPage() {

// 	const [file , setFile] = useState(null);

// 	async function handleUpload(){
		
// 		try{

// 			const url = await uploadMedia(file);
// 			console.log(url);

// 		}catch(error){
// 			console.log(error);
// 		}
		

// 	}

// 	function handleUploadOld(){

// 		uploadMedia(file).then((url)=>{
// 			console.log(url);
// 		}).catch((error)=>{
// 			console.log(error);
// 		})
// 	}

// 	return (
// 		<div className="w-full h-screen flex justify-center items-center bg-primary text-secondary flex-col gap-10">
			
// 			<input onChange={
// 				(e)=>{
// 					setFile(e.target.files[0])
// 				}
// 			} type="file"/>

// 			<button onClick={handleUpload} className="bg-secondary text-primary px-4 py-2 rounded-lg hover:bg-secondary/80 transition">
// 				Upload
// 			</button>
// 		</div>
// 	);
// }

export default function TestPage(){
	return(
		<div className="w-full h-full ">

			<div className="bg-green-500 lg:bg-red-600       w-[300px] h-[300px]">
			</div>
			
		</div>
	)
} 