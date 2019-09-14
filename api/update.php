<?php
include 'config.php';
// echo "Hello".'<br>';
// UPDATE knowledge set Know_Content='น่าน น่าน' WHERE Know_Id='4'
// echo 'Func = '.$_POST['Function_Name'];
$_POST['Function_Name']();
// echo $_POST['Function_Name'];
function Update_News(){
     //////////////////// set Data ////////////////////
     $Data = json_decode($_POST['_Data']);
     $News_Name = $Data->News_Name;
     $News_Content = $Data->News_Content;
     $Date = $Data->Date;
     $Time = $Data->Time;
     $AnimalType = $Data->AnimalType;
     $NewsType = $Data->NewsType;
     $News_Id = $Data->News_Id;
     // $Admin_Id = $Data->Admin_Id;
     
     //////////////////////// Update News //////////////////////////////////
     $sql_query = "UPDATE news 
     set News_Name='$News_Name', News_Content='$News_Content', News_Date='$Date', News_Time='$Time', T_News_Id='$NewsType' 
     WHERE News_Id='$News_Id'";
     $conn = getDB();
     $conn->query($sql_query);  
     // echo json_encode($Response_Data);
     // echo json_encode($_FILES);
     if($_FILES==null){
         // echo json_encode($_FILES);
     }
     else{
         /////////////////////// remove image in files and Delete on Image_News Table  //////////////
         $sql_query ="SELECT * FROM image_news WHERE News_Id='$News_Id'";
         $rst = $conn->query($sql_query);
         $Response_Data= $rst->fetchAll(PDO::FETCH_OBJ);
         
         for($i=0;$i<count($Response_Data);$i++){
             unlink("./image/".$Response_Data[$i]->Img_News_Name);
             // echo json_encode($Response_Data[$i]->Img_News_Name);
             // $Img_News_Id = $Response_Data[$i]->Img_News_Id;
             // echo $Img_News_Id;           
         }
         
         $sql_query ="DELETE FROM image_news WHERE News_Id='$News_Id'";
         $conn = getDB();
         $conn->query($sql_query);
 
         /////////////////////////////////////// New Insert to News_Image /////////////////////
         $i=0;
         for($i;$i<count($_FILES);$i++){
         // echo $i.'<br>';
             $New_Name ="img_".uniqid().date('dmY_His')."_".'.jpg';
             $path="./image/".$New_Name;
             $sql_query = "INSERT INTO image_news(Img_News_Name,News_Id) VALUES ('$New_Name','$News_Id')";
             $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
             $conn->query($sql_query);
             move_uploaded_file($_FILES['Image_News'.$i]['tmp_name'],$path);
             // echo $_FILES['Image_News'.$i]['tmp_name'].'<br>';
         }
     }
}
function Update_Knowledge(){
    //////////////////// set Data ////////////////////
    $Data = json_decode($_POST['_Data']);
    $Know_Name = $Data->Know_Name;
    $Know_Content = $Data->Know_Content;
    $Date = $Data->Date;
    $Time = $Data->Time;
    $AnimalType = $Data->AnimalType;
    $KnowledgeType = $Data->KnowledgeType;
    $Know_Id = $Data->Know_Id;
    $Know_Video_Link = $Data->Know_Video_Link;
    // echo 'Know_videio_link = '.$Know_Video_Link;
    // $Admin_Id = $Data->Admin_Id;
    
    //////////////////////// Update Knowledge //////////////////////////////////
    $sql_query = "UPDATE knowledge 
    set Know_Name='$Know_Name', Know_Content='$Know_Content', Know_Video_Link='$Know_Video_Link', Know_Date='$Date', Know_Time='$Time', T_Know_Id='$KnowledgeType' 
    WHERE Know_Id='$Know_Id'";
    $conn = getDB();
    $conn->query($sql_query);  
    // echo json_encode($Response_Data);
    // echo json_encode($_FILES);
    if($_FILES==null){
        // echo json_encode($_FILES);
    }
    else{
        /////////////////////// remove image in files and Delete on Image_Knowledge Table  //////////////
        $sql_query ="SELECT * FROM image_knowledge WHERE Know_Id='$Know_Id'";
        $rst = $conn->query($sql_query);
        $Response_Data= $rst->fetchAll(PDO::FETCH_OBJ);
        
        for($i=0;$i<count($Response_Data);$i++){
            unlink("./image/".$Response_Data[$i]->Img_Know_Name);
            // echo json_encode($Response_Data[$i]->Img_Know_Name);
            // $Img_Know_Id = $Response_Data[$i]->Img_Know_Id;
            // echo $Img_Know_Id;           
        }
        
        $sql_query ="DELETE FROM image_knowledge WHERE Know_Id='$Know_Id'";
        $conn = getDB();
        $conn->query($sql_query);

        /////////////////////////////////////// New Insert to Knowledge_Image /////////////////////
        $i=0;
        for($i;$i<count($_FILES);$i++){
        // echo $i.'<br>';
            $New_Name ="img_".uniqid().date('dmY_His')."_".'.jpg';
            $path="./image/".$New_Name;
            $sql_query = "INSERT INTO image_knowledge(Img_Know_Name,Know_Id) VALUES ('$New_Name','$Know_Id')";
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $conn->query($sql_query);
            move_uploaded_file($_FILES['Image_Knowledge'.$i]['tmp_name'],$path);
            // echo $_FILES['Image_Knowledge'.$i]['tmp_name'].'<br>';
        }
    }

}
function Update_Farm_State(){
    $Data = json_decode($_POST['_Data']);
    $Farm_Id = $Data->Farm_Id;
    echo 'Farm_Id = '.$Farm_Id;
    $sql_query = "UPDATE farm SET Farm_State='1' WHERE Farm_Id='$Farm_Id'";
    // WHERE Know_Id='$Know_Id'";
    $conn = getDB();
    $conn->query($sql_query); 
}
function Update_deny_Farm_State(){
    $Data = json_decode($_POST['_Data']);
    $Farm_Id = $Data->Farm_Id;
    echo 'Farm_Id = '.$Farm_Id;
    $sql_query = "UPDATE farm SET Farm_State='2' WHERE Farm_Id='$Farm_Id'";
    // WHERE Know_Id='$Know_Id'";
    $conn = getDB();
    $conn->query($sql_query); 
}

function Update_Farm(){ 
      //////////////////// set Data ////////////////////
    $Data = json_decode($_POST['_Data']);
    $Farm_Id = $Data->Farm_Id;
    $Farm_Name = $Data->Farm_Name;
    $Farm_Details = $Data->Farm_Details;
    $Farm_Address = $Data->Farm_Address;
    $Farm_Map = $Data->Farm_Map;
    $Farm_Email = $Data->Farm_Email;
    $Farm_Phone = $Data->Farm_Phone;
    $Farm_Date = $Data->Farm_Date;
    $Farm_Time = $Data->Farm_Time;
    // $Profile_Image = $Data->Profile_Image;
    $User_Id = $Data->User_Id;
    $New_Name="";

    // echo 'Farm_Id = '.$Farm_Id;
    //////////////////////////// Manage Profile ///////////////////////
    


    //////////////////////// Update Farm //////////////////////////////////
    $sql_query = "UPDATE farm 
    set Farm_Name='$Farm_Name', Farm_Details='$Farm_Details', Farm_Address='$Farm_Address', Farm_Map='$Farm_Map',
    Farm_Email='$Farm_Email', Farm_Phone='$Farm_Phone', Farm_Date='$Farm_Date', Farm_Time='$Farm_Time'
    WHERE Farm_Id='$Farm_Id'";
    $conn = getDB();
    $conn->query($sql_query);  
    // echo json_encode($Response_Data);
    // echo json_encode($_FILES);
    
    if($_FILES==null){
        // echo json_encode($_FILES);
    }
    else{
        if($_FILES['Profile_Image']){
            // echo 'Hellooooooooo';
            $sql_query ="SELECT Profile_Image FROM farm WHERE Farm_Id='$Farm_Id'";
            $conn = getDB();
            $rst = $conn->query($sql_query);
            $Response= $rst->fetchAll(PDO::FETCH_NUM);  
            echo $Response[0][0];
            unlink("./image/".$Response[0][0]); //          must open
            $New_Name ="img_".uniqid().date('dmY_His')."_".'.jpg';
            $path="./image/".$New_Name;
            move_uploaded_file($_FILES['Profile_Image']['tmp_name'],$path);
            ////////////// update profile name to farm table /////////////////
            $sql_query = "UPDATE farm set Profile_Image ='$New_Name' WHERE Farm_Id='$Farm_Id'";
            $conn = getDB();
            $conn->query($sql_query);  

            if(count($_FILES)>1){
                $sql_query ="SELECT * FROM image_farm WHERE Farm_Id='$Farm_Id'";
                $rst = $conn->query($sql_query);
                $Response_Data= $rst->fetchAll(PDO::FETCH_OBJ);  
                //   echo json_encode($Response_Data);
                for($i=0;$i<count($Response_Data);$i++){
                unlink("./image/".$Response_Data[$i]->Img_Farm_Name);
                // echo json_encode($Response_Data[$i]->Img_Farm_Name);
                // $Img_Farm_Id = $Response_Data[$i]->Img_Farm_Id;
                // echo $Img_Farm_Id;           
                }
          
                $sql_query ="DELETE FROM image_farm WHERE Farm_Id='$Farm_Id'";
                $conn = getDB();
                $conn->query($sql_query);
                /////////////////////////////////////// New Insert to Farm_Image /////////////////////
                for($i=0;$i<count($_FILES)-1;$i++){
                // echo $i.'<br>';
                    $New_Name ="img_".uniqid().date('dmY_His')."_".'.jpg';
                    $path="./image/".$New_Name;
                    $sql_query = "INSERT INTO image_Farm(Img_Farm_Name,Farm_Id) VALUES ('$New_Name','$Farm_Id')";
                    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                    $conn->query($sql_query);
                    move_uploaded_file($_FILES['Image_Farm'.$i]['tmp_name'],$path);
                    // echo $_FILES['Image_Farm'.$i]['tmp_name'].'<br>';
                }
            }
        }
        else { 
            /////////////////////// remove image in files and Delete on Image_Farm Table  //////////////
            $sql_query ="SELECT * FROM image_farm WHERE Farm_Id='$Farm_Id'";
            $rst = $conn->query($sql_query);
            $Response_Data= $rst->fetchAll(PDO::FETCH_OBJ);  
            //   echo json_encode($Response_Data);
            for($i=0;$i<count($Response_Data);$i++){
            unlink("./image/".$Response_Data[$i]->Img_Farm_Name);
            // echo json_encode($Response_Data[$i]->Img_Farm_Name);
            // $Img_Farm_Id = $Response_Data[$i]->Img_Farm_Id;
            // echo $Img_Farm_Id;           
            }
            $sql_query ="DELETE FROM image_farm WHERE Farm_Id='$Farm_Id'";
            $conn = getDB();
            $conn->query($sql_query);

            /////////////////////////////////////// New Insert to Farm_Image /////////////////////
            for($i=0;$i<count($_FILES);$i++){
                // echo $i.'<br>';
                $New_Name ="img_".uniqid().date('dmY_His')."_".'.jpg';
                $path="./image/".$New_Name;
                $sql_query = "INSERT INTO image_Farm(Img_Farm_Name,Farm_Id) VALUES ('$New_Name','$Farm_Id')";
                $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                $conn->query($sql_query);
                move_uploaded_file($_FILES['Image_Farm'.$i]['tmp_name'],$path);
                // echo $_FILES['Image_Farm'.$i]['tmp_name'].'<br>';
            }
        }      
  
    
    }
}

function Update_Farm_and_State(){ 
    //////////////////// set Data ////////////////////
  $Data = json_decode($_POST['_Data']);
  $Farm_Id = $Data->Farm_Id;
  $Farm_Name = $Data->Farm_Name;
  $Farm_Details = $Data->Farm_Details;
  $Farm_Address = $Data->Farm_Address;
  $Farm_Map = $Data->Farm_Map;
  $Farm_Email = $Data->Farm_Email;
  $Farm_Phone = $Data->Farm_Phone;
  $Farm_Date = $Data->Farm_Date;
  $Farm_Time = $Data->Farm_Time;
  // $Profile_Image = $Data->Profile_Image;
  $User_Id = $Data->User_Id;
  $New_Name="";

  // echo 'Farm_Id = '.$Farm_Id;
  //////////////////////////// Manage Profile ///////////////////////
  


  //////////////////////// Update Farm //////////////////////////////////
  $sql_query = "UPDATE farm 
  set Farm_Name='$Farm_Name', Farm_Details='$Farm_Details', Farm_Address='$Farm_Address', Farm_Map='$Farm_Map',
  Farm_Email='$Farm_Email', Farm_Phone='$Farm_Phone', Farm_Date='$Farm_Date', Farm_Time='$Farm_Time',Farm_State='0'
  WHERE Farm_Id='$Farm_Id'";
  $conn = getDB();
  $conn->query($sql_query);  
  // echo json_encode($Response_Data);
  // echo json_encode($_FILES);
  
  if($_FILES==null){
      // echo json_encode($_FILES);
  }
  else{
      if($_FILES['Profile_Image']){
          // echo 'Hellooooooooo';
          $sql_query ="SELECT Profile_Image FROM farm WHERE Farm_Id='$Farm_Id'";
          $conn = getDB();
          $rst = $conn->query($sql_query);
          $Response= $rst->fetchAll(PDO::FETCH_NUM);  
          echo $Response[0][0];
          unlink("./image/".$Response[0][0]); //          must open
          $New_Name ="img_".uniqid().date('dmY_His')."_".'.jpg';
          $path="./image/".$New_Name;
          move_uploaded_file($_FILES['Profile_Image']['tmp_name'],$path);
          ////////////// update profile name to farm table /////////////////
          $sql_query = "UPDATE farm set Profile_Image ='$New_Name' WHERE Farm_Id='$Farm_Id'";
          $conn = getDB();
          $conn->query($sql_query);  

          if(count($_FILES)>1){
              $sql_query ="SELECT * FROM image_farm WHERE Farm_Id='$Farm_Id'";
              $rst = $conn->query($sql_query);
              $Response_Data= $rst->fetchAll(PDO::FETCH_OBJ);  
              //   echo json_encode($Response_Data);
              for($i=0;$i<count($Response_Data);$i++){
              unlink("./image/".$Response_Data[$i]->Img_Farm_Name);
              // echo json_encode($Response_Data[$i]->Img_Farm_Name);
              // $Img_Farm_Id = $Response_Data[$i]->Img_Farm_Id;
              // echo $Img_Farm_Id;           
              }
        
              $sql_query ="DELETE FROM image_farm WHERE Farm_Id='$Farm_Id'";
              $conn = getDB();
              $conn->query($sql_query);
              /////////////////////////////////////// New Insert to Farm_Image /////////////////////
              for($i=0;$i<count($_FILES)-1;$i++){
              // echo $i.'<br>';
                  $New_Name ="img_".uniqid().date('dmY_His')."_".'.jpg';
                  $path="./image/".$New_Name;
                  $sql_query = "INSERT INTO image_Farm(Img_Farm_Name,Farm_Id) VALUES ('$New_Name','$Farm_Id')";
                  $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                  $conn->query($sql_query);
                  move_uploaded_file($_FILES['Image_Farm'.$i]['tmp_name'],$path);
                  // echo $_FILES['Image_Farm'.$i]['tmp_name'].'<br>';
              }
          }
      }
      else { 
          /////////////////////// remove image in files and Delete on Image_Farm Table  //////////////
          $sql_query ="SELECT * FROM image_farm WHERE Farm_Id='$Farm_Id'";
          $rst = $conn->query($sql_query);
          $Response_Data= $rst->fetchAll(PDO::FETCH_OBJ);  
          //   echo json_encode($Response_Data);
          for($i=0;$i<count($Response_Data);$i++){
          unlink("./image/".$Response_Data[$i]->Img_Farm_Name);
          // echo json_encode($Response_Data[$i]->Img_Farm_Name);
          // $Img_Farm_Id = $Response_Data[$i]->Img_Farm_Id;
          // echo $Img_Farm_Id;           
          }
          $sql_query ="DELETE FROM image_farm WHERE Farm_Id='$Farm_Id'";
          $conn = getDB();
          $conn->query($sql_query);

          /////////////////////////////////////// New Insert to Farm_Image /////////////////////
          for($i=0;$i<count($_FILES);$i++){
              // echo $i.'<br>';
              $New_Name ="img_".uniqid().date('dmY_His')."_".'.jpg';
              $path="./image/".$New_Name;
              $sql_query = "INSERT INTO image_Farm(Img_Farm_Name,Farm_Id) VALUES ('$New_Name','$Farm_Id')";
              $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
              $conn->query($sql_query);
              move_uploaded_file($_FILES['Image_Farm'.$i]['tmp_name'],$path);
              // echo $_FILES['Image_Farm'.$i]['tmp_name'].'<br>';
          }
      }      

  
  }
}
function Update_Market(){
    $Data = json_decode($_POST['_Data']);
    $Market_Id = $Data->Market_Id;
    $Market_Name = $Data->Market_Name;
    $Market_Details = $Data->Market_Details;
    $Market_Date = $Data->Market_Date;
    $Market_Time = $Data->Market_Time;
    $Market_Price = $Data->Market_Price;
    $T_Market_Id = $Data->T_Market_Id;
    $User_Id = $Data->User_Id;
    // $Admin_Id = $Data->Admin_Id;
    echo 'data = '.json_encode($Data);
    //////////////////////// Update Market //////////////////////////////////
    $sql_query = "UPDATE market 
    set Market_Name='$Market_Name', Market_Details='$Market_Details', Market_Date='$Market_Date', 
    Market_Time='$Market_Time',Market_Price='$Market_Price', T_Market_Id='$T_Market_Id' 
    WHERE Market_Id='$Market_Id'";
    $conn = getDB();
    $conn->query($sql_query);  
    // echo json_encode($Response_Data);
    // echo json_encode($_FILES);
    if($_FILES==null){
        // echo json_encode($_FILES);
    }
    else{
        /////////////////////// remove image in files and Delete on Image_Market Table  //////////////
        $sql_query ="SELECT * FROM image_Market WHERE Market_Id='$Market_Id'";
        $rst = $conn->query($sql_query);
        $Response_Data= $rst->fetchAll(PDO::FETCH_OBJ);
        
        for($i=0;$i<count($Response_Data);$i++){
            unlink("./image/".$Response_Data[$i]->Img_Market_Name);
            // echo json_encode($Response_Data[$i]->Img_Market_Name);
            // $Img_Market_Id = $Response_Data[$i]->Img_Market_Id;
            // echo $Img_Market_Id;           
        }
        
        $sql_query ="DELETE FROM image_Market WHERE Market_Id='$Market_Id'";
        $conn = getDB();
        $conn->query($sql_query);

        /////////////////////////////////////// New Insert to Market_Image /////////////////////
        $i=0;
        for($i;$i<count($_FILES);$i++){
        // echo $i.'<br>';
            $New_Name ="img_".uniqid().date('dmY_His')."_".'.jpg';
            $path="./image/".$New_Name;
            $sql_query = "INSERT INTO image_Market(Img_Market_Name,Market_Id) VALUES ('$New_Name','$Market_Id')";
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $conn->query($sql_query);
            move_uploaded_file($_FILES['Image_Market'.$i]['tmp_name'],$path);
            // echo $_FILES['Image_Market'.$i]['tmp_name'].'<br>';
        }
    }
}

function Update_Personal(){
    $Data = json_decode($_POST['_Data']);
    $User_Id = $Data->Username;
    $User_Name = $Data->Name;
    $User_Address = $Data->Address;
    $User_Phone = $Data->Phone;
    $User_Email = $Data->Email;

    if($_FILES==null){
        // echo json_encode($_FILES);
        $sql_query = "UPDATE users 
        set User_Name='$User_Name', User_Address='$User_Address', User_Phone='$User_Phone', User_Email='$User_Email' 
        WHERE User_Id='$User_Id'";
        $conn = getDB();
        $conn->query($sql_query); 


    }
    else{
        $sql_query ="SELECT User_Pic FROM `users` WHERE User_Id='$User_Id'";
        $conn = getDB();
        $rst = $conn->query($sql_query);
        $Response_Data= $rst->fetchAll(PDO::FETCH_OBJ);

        // unlink("./image/".$Response_Data[0]->User_Pic);
        // echo json_encode($Response_Data[0]->User_Pic);

        if($Response_Data[0]->User_Pic == "NO-PROFILE.jpg"){
            // echo 'Hello';
            // echo json_encode($Response_Data[0]->User_Pic);
            $New_Name ="img_".uniqid().date('dmY_His')."_".'.jpg';
            $User_Pic = $New_Name;
            $path="./image/".$New_Name;
            move_uploaded_file($_FILES['Profile_Image']['tmp_name'],$path);
            // echo $New_Name;
            $sql_query = "UPDATE users 
            set User_Name='$User_Name', User_Address='$User_Address', User_Phone='$User_Phone', User_Email='$User_Email'
            , User_Pic='$User_Pic' WHERE User_Id='$User_Id'";
            $conn = getDB();
            $conn->query($sql_query); 
   
            
        }
        else{
            unlink("./image/".$Response_Data[0]->User_Pic);
            // echo $Response_Data[0]->User_Pic;
            $New_Name ="img_".uniqid().date('dmY_His')."_".'.jpg';
            $User_Pic = $New_Name;
            $path="./image/".$New_Name;
            move_uploaded_file($_FILES['Profile_Image']['tmp_name'],$path);
            // echo $New_Name;
            $sql_query = "UPDATE users 
            set User_Name='$User_Name', User_Address='$User_Address', User_Phone='$User_Phone', User_Email='$User_Email'
            , User_Pic='$User_Pic' WHERE User_Id='$User_Id'";
            $conn = getDB();
            $conn->query($sql_query); 

        }

    }
    
}
function Update_Comments(){

    $Data = json_decode($_POST['_Data']);
    $message = $Data->message;
    $comment_Id = $Data->comment_Id;
     echo $comment_Id;
     //////////////////////// Update Comments //////////////////////////////////
     $sql_query = "UPDATE comments set comment_Content='$message' WHERE comment_Id='$comment_Id'";
     $conn = getDB();
     $conn->query($sql_query);  
}

function Update_Posts(){
    //////////////////// set Data ////////////////////
    $Data = json_decode($_POST['_Data']);
    $Posts_Name = $Data->Posts_Name;
    $Posts_Content = $Data->Posts_Content;
    $Date = $Data->Date;
    $Time = $Data->Time;
    $T_Posts_Id = $Data->T_Posts_Id;
   //  $Admin_Id = $Data->Admin_Id;
   //  $User_Id = $Data->User_Id;
    $AnimalType = $Data->AnimalType;
    $Posts_Id = $Data->Posts_Id;
    
    //////////////////////// Update News //////////////////////////////////


     $sql_query = "UPDATE posts set Posts_Name='$Posts_Name', Posts_Content='$Posts_Content', Posts_Date='$Date',
      Posts_Time='$Time', T_Posts_Id='$T_Posts_Id', Animal_Id='$AnimalType' WHERE Posts_Id='$Posts_Id'";
   
     echo $sql_query;
     $conn = getDB();
     $conn->query($sql_query);  
     // echo json_encode($Response_Data);
     // echo json_encode($_FILES);
     if($_FILES==null){
         // echo json_encode($_FILES);
     }
     else{
         /////////////////////// remove image in files and Delete on Image_Posts Table  //////////////
         $sql_query ="SELECT * FROM image_posts WHERE Posts_Id='$Posts_Id'";
         $rst = $conn->query($sql_query);
         $Response_Data= $rst->fetchAll(PDO::FETCH_OBJ);
         
         for($i=0;$i<count($Response_Data);$i++){
             unlink("./image/".$Response_Data[$i]->Img_Posts_Name);
             // echo json_encode($Response_Data[$i]->Img_Posts_Name);
             // $Img_Posts_Id = $Response_Data[$i]->Img_Posts_Id;
             // echo $Img_Posts_Id;           
         }
         
         $sql_query ="DELETE FROM image_posts WHERE Posts_Id='$Posts_Id'";
         $conn = getDB();
         $conn->query($sql_query);
 
         /////////////////////////////////////// New Insert to Posts_Image /////////////////////
         $i=0;
         for($i;$i<count($_FILES);$i++){
         // echo $i.'<br>';
             $New_Name ="img_".uniqid().date('dmY_His')."_".'.jpg';
             $path="./image/".$New_Name;
             $sql_query = "INSERT INTO image_posts(Img_Posts_Name,Posts_Id) VALUES ('$New_Name','$Posts_Id')";
             $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
             $conn->query($sql_query);
             move_uploaded_file($_FILES['Image_Posts'.$i]['tmp_name'],$path);
             // echo $_FILES['Image_Posts'.$i]['tmp_name'].'<br>';
         }
    }
}
?>