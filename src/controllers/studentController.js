import { GenDate } from "../utilities/date";

export const markAttendance= async (req,res,next)=>{
    try{
        const { id,sub_id } = req.params;
        let date = GenDate(new Date());
        console.log(a);
        let status= 'P';
        




        

    }catch(err){
        console.log(err);
        
        next(err);
    }
}
