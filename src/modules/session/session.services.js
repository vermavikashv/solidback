import sessionDetalis from "../../models/session.model.js"
const sessionService=({ipAddress,remoteAddress,userId,userAgent,isValid})=>{
     sessionDetalis.create({ipAddress,remoteAddress,userId,userAgent,isValid})
}
export default sessionService;