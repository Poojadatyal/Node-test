import { version } from "../../package.json";
import { Router } from "express";

export default ({ config, db }) => {
  let api = Router();

  
  api.post("/binary", (req, res) => {
    let { used,name, ref_id, position } = req.body;
   const user_id = require("uuid/v1");
   console.log(user_id, "id");
    let arr1 = [];
    let arr2=[];
   

const   checkChildren = (used) =>{
      arr2 = arr1.map(r => r.children);
     console.log(arr2, "child");
     let count=0;
     arr2.forEach(i=> {
       if(used == i){
         
         count++;
       }
     })
console.log(count,"CurrentCount")
     if(count==0){
       db.query(`INSERT into moneychain values ('${user_id()}', '${name}','${position}','${ref_id}', '${used}')`,(err, response) => {
         if (err) {
           console.log(err.stack);
         } else {
           console.log("No child present", response.rows);
         }
     });
     }
     else if(count==1){
      let subId="";
       arr1.forEach(j=> {
         if(j.children == used && j.position != position){
           db.query(`INSERT into moneychain values ('${user_id()}', '${name}', '${position}','${ref_id}','${used}')`,(err, response) => {
             if (err) {
               console.log(err.stack);
             } else {
               console.log("one child present", response.rows);
             }
         })
         }
         else if(j.children == used && j.position == position){
          subId = j.user_id;
          checkChildren(subId);
         }
       })
     }
     else{
       let newArr=[];
       let subId="";
       arr1.forEach(j => {
         if(j.children == used && j.position == position){
           subId = j.user_id;
           checkChildren(subId);
         }
       })


     }
   }
   db.query(`select * from moneychain `, (err, response) => {
    if (err) {
      console.log(err.stack);
    } else {
      console.log(response.rows, "res");
      arr1 = response.rows;
       checkChildren(used);
       res.json({response:"successful"})
}
});
  });


api.get('/children', (req,res) => {

let {user_id} = req.body;

let arr=[];
let ans=[];
const findChildren = (user_id) => {
  let count=0;
  let tempUserId='';
  arr.forEach( i => {
    if(user_id == i.children){
    count++;
    console.log(count,"count");
    
   ans.push(i);
    tempUserId = i.user_id;
    console.log(tempUserId,"tempUserId");
    
    findChildren(tempUserId); }
    else {
      console.log("nothing");
      
    }
  })
}
db.query(`select * from moneychain `, (err, response) => {
  if (err) {
    console.log(err.stack);
  } else {
    console.log(response.rows, "res");
    arr = response.rows;
    console.log(arr,"arr");
    
    findChildren(user_id);
    res.json({
      children: ans
    })
   
}

});
}) ;

api.get('/user-cost', (req,res) => {
  let {user_id} = req.body;
  let totalCost=0;
  let count1=0;
  let arr=[];
  let arr2=[];
  let arr1=[];
  let leftArr=[];
  let rightArr=[];
  let arrrrrr = [];

  const findChildren = (user_id) => {
    let count=0;
    let tempUserId='';
    arr.forEach( i => {
      if(user_id == i.ref_id){
      count++;
      console.log(count,"count");
      arrrrrr.push(i);
      tempUserId = i.user_id;
      console.log(tempUserId,"tempUserId");
      findChildren(tempUserId); }
      else {
        console.log("nothing");
      }
    })
  
  }
  db.query(`select * from moneychain `, (err, response) => {
    if (err) {
      console.log(err.stack);
    } else {
      console.log(response.rows, "res");
      arr = response.rows;
      console.log(arr,"arr");
      
      findChildren(user_id);
 }
      
      arrrrrr.forEach( child => {
        console.log(child,"child");
        
        if(child.children  && child.position=='left'){
         leftArr.push(child);
        }
        if(child.children  && child.position=='Right') {
         rightArr.push(child);
        }
      })

      console.log(leftArr, "Array");

      console.log(rightArr , "RightA")
      
      console.log(leftArr.length,rightArr.length,"length");
      
      if(leftArr.length<=rightArr.length){
        totalCost=leftArr.length*100;
      }
      else{
        totalCost=rightArr.length*100;
      }
      res.json({
        Cost: totalCost,right:rightArr.length,left:leftArr.length
      })
  }
  );
  }) ;


  return api;
};
