<?php
include 'config.php';
// echo "Hello".'<br>';
// echo 'Func = '.$_POST['Function_Name'];
$_POST['Function_Name']();
// Add_News();

function Add_News(){
    //////////////////// set Data ////////////////////
    $Data = json_decode($_POST['_Data']);
    $News_Name = $Data->News_Name;
    $News_Content = $Data->News_Content;
    $Date = $Data->Date;
    $Time = $Data->Time;
    $AnimalType = $Data->AnimalType;
    $NewsType = $Data->NewsType;
    $Admin_Id = $Data->Admin_Id;
   
    //////////////////////// Insert News //////////////////////////////////
    $sql_query ="INSERT INTO news(News_Name,News_Content,News_Date,News_Time,T_News_Id,Animal_Id,Admin_Id) VALUES
     ('$News_Name','$News_Content','$Date','$Time','$NewsType','$AnimalType','$Admin_Id')";
    $sql_query2 = "SELECT LAST_INSERT_ID()";
    $conn = getDB();
    // $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $conn->query($sql_query);
    $rst = $conn->query($sql_query2); // Call_last_insert_id
    $Response_Data= $rst->fetchAll(PDO::FETCH_NUM);
    // echo $Response_Data[0][0];
    $News_Id = $Response_Data[0][0];
    /////////////////////////////////////// Insert to News_Image /////////////////////
    $i=0;
    // INSERT INTO image_News(Img_News_Name,News_Id) VALUES ();
    for($i;$i<count($_FILES);$i++){
    // echo $i.'<br>';
        $New_Name ="img_".uniqid().date('dmY_His')."_".'.jpg';
        $path="./image/".$New_Name;

        $sql_query = "INSERT INTO image_news(Img_News_Name,News_Id) VALUES ('$New_Name','$News_Id')";
        // echo $sql_query;
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $conn->query($sql_query);
        move_uploaded_file($_FILES['Image_News'.$i]['tmp_name'],$path);
        // echo $_FILES['Image_News'.$i]['tmp_name'].'<br>';
    }
}

function Add_Knowledge(){
    //////////////////// set Data ////////////////////
    $Data = json_decode($_POST['_Data']);
    $Know_Name = $Data->Know_Name;
    $Know_Content = $Data->Know_Content;
    $Date = $Data->Date;
    $Time = $Data->Time;
    $AnimalType = $Data->AnimalType;
    $KnowledgeType = $Data->KnowledgeType;
    $Admin_Id = $Data->Admin_Id;
    $Know_Video_Link = $Data->Know_Video_Link;
    // echo 'Know_video_url = '.$Know_Video_Url;
    //////////////////////// Insert Knowledge //////////////////////////////////
    $sql_query ="INSERT INTO knowledge(Know_Name,Know_Content,Know_Video_Link,Know_Date,Know_Time,T_Know_Id,Animal_Id,Admin_Id) VALUES
     ('$Know_Name','$Know_Content','$Know_Video_Link','$Date','$Time','$KnowledgeType','$AnimalType','$Admin_Id')";
    $sql_query2 = "SELECT LAST_INSERT_ID()";
    $conn = getDB();
    // $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $conn->query($sql_query);
    $rst = $conn->query($sql_query2); // Call_last_insert_id
    $Response_Data= $rst->fetchAll(PDO::FETCH_NUM);
    // echo $Response_Data[0][0];
    $Knowledge_Id = $Response_Data[0][0];
    /////////////////////////////////////// Insert to Knowledge_Image /////////////////////
    $i=0;
    // INSERT INTO image_knowledge(Img_Know_Name,Know_Id) VALUES ();
    for($i;$i<count($_FILES);$i++){
    // echo $i.'<br>';
        $New_Name ="img_".uniqid().date('dmY_His')."_".'.jpg';
        $path="./image/".$New_Name;

        $sql_query = "INSERT INTO image_knowledge(Img_Know_Name,Know_Id) VALUES ('$New_Name','$Knowledge_Id')";
        // echo $sql_query;
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $conn->query($sql_query);
        move_uploaded_file($_FILES['Image_Knowledge'.$i]['tmp_name'],$path);
        // echo $_FILES['Image_Knowledge'.$i]['tmp_name'].'<br>';
    }
}

function Add_Farm(){
    // echo 'Hello';
    $Data = json_decode($_POST['_Data']);
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
    $x=0;
    // echo 'data = '.json_encode($Data).'<br>';
    // echo $Farm_Name.'<br>'.$Farm_Details.'<br>'.$Farm_Address.'<br>'.$Farm_Map.'<br>'.$Farm_Email.'<br>'.$Farm_Phone.'<br>'.$Farm_Date.'<br>'.$Farm_Time.'<br>'.$User_Id;
    // echo 'profile_image ='.$_FILES['Profile_Image']['tmp_name'];
    // echo count($_FILES);
    if($_FILES['Profile_Image']){
        $x=1;
        $New_Name ="img_".uniqid().date('dmY_His')."_".'.jpg';
        $path="./image/".$New_Name;
        $Profile_Image = $New_Name;
        move_uploaded_file($_FILES['Profile_Image']['tmp_name'],$path);
        // echo $Profile_Image;
    }
    
 
    ////////////////////////////////// Insert Farm //////////////////////////////////
      $sql_query ="INSERT INTO farm(Farm_Name,Farm_Details,Farm_Address,Farm_Map,Farm_Email,Farm_Phone,
      Farm_Date,Farm_Time,Profile_Image,User_Id,Farm_State) VALUES ('$Farm_Name','$Farm_Details','$Farm_Address','$Farm_Map',
      '$Farm_Email','$Farm_Phone','$Farm_Date','$Farm_Time','$Profile_Image','$User_Id','0')";

     $sql_query2 = "SELECT LAST_INSERT_ID()";
     $conn = getDB();
     $conn->query($sql_query);
     $rst = $conn->query($sql_query2); // Call_last_insert_id
     $Response_Data= $rst->fetchAll(PDO::FETCH_NUM);
    //  echo $Response_Data[0][0];
     $Farm_Id = $Response_Data[0][0];
     /////////////////////////////////////// Insert to Farm_Image /////////////////////
     
     // INSERT INTO image_Farm(Img_Farm_Name,Farm_Id) VALUES ();
     for($i=0;$i<(count($_FILES))-$x;$i++){
     // echo $i.'<br>';
         $New_Name ="img_".uniqid().date('dmY_His')."_".'.jpg';
         $path="./image/".$New_Name;
         $sql_query = "INSERT INTO image_farm(Img_Farm_Name,Farm_Id) VALUES ('$New_Name','$Farm_Id')";
         $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
         $conn->query($sql_query);
         move_uploaded_file($_FILES['Image_Farm'.$i]['tmp_name'],$path);
         // echo $_FILES['Image_Farm'.$i]['tmp_name'].'<br>';
     }
}

function Add_Market(){
    //////////////////// set Data ////////////////////
    $Data = json_decode($_POST['_Data']);
    $Market_Name = $Data->Market_Name;
    $Market_Details = $Data->Market_Details;
    $Market_Date = $Data->Market_Date;
    $Market_Time = $Data->Market_Time;
    $Market_Price = $Data->Market_Price;
    $T_Market_Id = $Data->T_Market_Id;
    $User_Id = $Data->User_Id;
   
    //////////////////////// Insert Market //////////////////////////////////
    $sql_query ="INSERT INTO market(Market_Name,Market_Details,Market_Date,Market_Time,Market_Price,T_Market_Id,User_Id) VALUES
     ('$Market_Name','$Market_Details','$Market_Date','$Market_Time','$Market_Price','$T_Market_Id','$User_Id')";
    // echo 'sql_query = '.$sql_query;
    $sql_query2 = "SELECT LAST_INSERT_ID()";
    $conn = getDB();
    // $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $conn->query($sql_query);
    $rst = $conn->query($sql_query2); // Call_last_insert_id
    $Response_Data= $rst->fetchAll(PDO::FETCH_NUM);
    // echo $Response_Data[0][0];
    $Market_Id = $Response_Data[0][0];
    // echo 'Market_Id = '.$Market_Id;
    /////////////////////////////////////// Insert to Market_Image /////////////////////
    // INSERT INTO image_Market(Img_Market_Name,Market_Id) VALUES ();
    echo 'File = '.count($_FILES).'<br>';
    // echo 'image = '.$_FILES['Image_Market0']['tmp_name'];
    for($i = 0;$i<count($_FILES);$i++){
        echo $i.'<br>';
        $New_Name ="img_".uniqid().Date('dmY_His')."_".'.jpg';
        $path="./image/".$New_Name;

        $sql_query = "INSERT INTO image_market(Img_Market_Name,Market_Id) VALUES ('$New_Name','$Market_Id')";
        echo $sql_query.'<br>';
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $conn->query($sql_query);
        move_uploaded_file($_FILES['Image_Market'.$i]['tmp_name'],$path);
        echo $_FILES['Image_Market'.$i]['tmp_name'].'<br>';
    }
}
function Register(){
    $Data = json_decode($_POST['_Data']);
    $Username=$Data->Username;
    $Password=$Data->Password;
    $Password = md5($Password);
    $Name=$Data->Name;
    $Adress=$Data->Adress;
    $Phone=$Data->Phone;
    $Email=$Data->Email;
    $Profile;
    try {
                 
        $sql_query = "SELECT * from users where User_Id='$Username' or User_Email='$Email'";
        $conn = getDB();
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $rst =$conn->query($sql_query);
        $Response_Data= $rst->fetchAll(PDO::FETCH_OBJ);    
        
        if(!empty($Response_Data)){
            // echo("dddddddddddddddddddd");
            $Response_Data = json_encode($Response_Data);
            echo '{"CanNot": ' .$Response_Data . '}';
    
        }      
        else{
            $New_Name ="img_".uniqid().date('dmY_His')."_".'.jpg';
            $path="./image/".$New_Name;
            $Profile = $New_Name;
            move_uploaded_file($_FILES['Profile_Image']['tmp_name'],$path);
            // echo $Profile_Image;
            // echo 'Run';
            $sql_query = "INSERT INTO users(User_Id,User_Pass,User_Name,User_Address,User_Phone,User_Email,User_Pic)
             VALUES ('$Username','$Password','$Name','$Adress','$Phone','$Email' ,'$Profile')";
            $conn = getDB();
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $rst =$conn->query($sql_query);
            echo '{"State":[{"st":"jj"}]}';         
        }
    }
    catch(PDOException $e) {
        echo 'error: '. $e->getMessage();
    }
}
function Add_Comments(){
    // echo 'Hellooo';
    $Data = json_decode($_POST['_Data']);
    $message = $Data->message;
    $comment_Date = $Data->Date;
    $comment_Time = $Data->Time;
    $Admin_Id = $Data->Admin_Id;
    $User_Id = $Data->User_Id;
    $Posts_Id = $Data->Posts_Id;
    // echo $message.'<br>'.$comment_Date.'<br>'.$comment_Time.'<br>'.$Admin_Id.'<br>'.$User_Id.'<br>'.$Posts_Id;
    //////////////////////// Insert comment //////////////////////////////////
    if($Admin_Id != "" || $Admin_Id != null){
        // echo 'Admin';
        $sql_query ="INSERT INTO comments(comment_Content,comment_Date,comment_Time,Admin_Id,Posts_Id) VALUES
        ('$message','$comment_Date','$comment_Time','$Admin_Id','$Posts_Id')";
    }
    else{
        // echo 'User';
        $sql_query ="INSERT INTO comments(comment_Content,comment_Date,comment_Time,User_Id,Posts_Id) VALUES
        ('$message','$comment_Date','$comment_Time','$User_Id','$Posts_Id')";
    }
    
    // echo 'sql_query = '.$sql_query;
    $sql_query2 = "SELECT LAST_INSERT_ID()";
    $conn = getDB();
    $conn->query($sql_query);
    $rst = $conn->query($sql_query2); // Call_last_insert_id
    $Response_Data= $rst->fetchAll(PDO::FETCH_NUM);
    // echo $Response_Data[0][0];
    $comment_Id = $Response_Data[0][0];
    // echo 'comment_Id = '.$comment_Id;
    /////////////////////////////////////// Insert to comment_Image /////////////////////
    // INSERT INTO image_comment(Img_comment_Name,comment_Id) VALUES ();
    // echo 'File = '.count($_FILES).'<br>';
    // echo 'File = '.json_encode($_FILES).'<br>';
    // echo 'image = '.$_FILES['Image_comment0']['tmp_name'];
    for($i = 0;$i<count($_FILES);$i++){
        echo $i.'<br>';
        $New_Name ="img_".uniqid().Date('dmY_His')."_".'.jpg';
        $path="./image/".$New_Name;

        $sql_query = "INSERT INTO image_comment(Img_comment_Name,comment_Id) VALUES ('$New_Name','$comment_Id')";
        echo $sql_query.'<br>';
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $conn->query($sql_query);
        move_uploaded_file($_FILES['Image_Comments'.$i]['tmp_name'],$path);
        // echo $_FILES['Image_comment'.$i]['tmp_name'].'<br>';
    }
}
function Add_Posts(){
     //////////////////// set Data ////////////////////
     $Data = json_decode($_POST['_Data']);
     $Posts_Name = $Data->Posts_Name;
     $Posts_Content = $Data->Posts_Content;
     $Date = $Data->Date;
     $Time = $Data->Time;
     $T_Posts_Id = $Data->T_Posts_Id;
     $Admin_Id = $Data->Admin_Id;
     $User_Id = $Data->User_Id;
     $AnimalType = $Data->AnimalType;
    
     //////////////////////// Insert Posts //////////////////////////////////
     if($Admin_Id=="" || $Admin_Id==null){
        $sql_query ="INSERT INTO posts(Posts_Name,Posts_Content,Posts_Date,Posts_Time,T_Posts_Id,User_Id,Animal_Id) VALUES
        ('$Posts_Name','$Posts_Content','$Date','$Time','$T_Posts_Id','$User_Id','$AnimalType')";
     }
     else{
        $sql_query ="INSERT INTO posts(Posts_Name,Posts_Content,Posts_Date,Posts_Time,T_Posts_Id,Admin_Id,Animal_Id) VALUES
        ('$Posts_Name','$Posts_Content','$Date','$Time','$T_Posts_Id','$Admin_Id','$AnimalType')";
     }
     
     $sql_query2 = "SELECT LAST_INSERT_ID()";
     echo $sql_query;
     $conn = getDB();
     // $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
     $conn->query($sql_query);
     $rst = $conn->query($sql_query2); // Call_last_insert_id
     $Response_Data= $rst->fetchAll(PDO::FETCH_NUM);
     // echo $Response_Data[0][0];
     $Posts_Id = $Response_Data[0][0];
     /////////////////////////////////////// Insert to Posts_Image /////////////////////
     $i=0;
     for($i;$i<count($_FILES);$i++){
     // echo $i.'<br>';
         $New_Name ="img_".uniqid().date('dmY_His')."_".'.jpg';
         $path="./image/".$New_Name;
 
         $sql_query = "INSERT INTO image_posts(Img_Posts_Name,Posts_Id) VALUES ('$New_Name','$Posts_Id')";
         // echo $sql_query;
         $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
         $conn->query($sql_query);
         move_uploaded_file($_FILES['Image_Posts'.$i]['tmp_name'],$path);
         // echo $_FILES['Image_Posts'.$i]['tmp_name'].'<br>';
     }
}

function Upload_Notification(){
    $Data = json_decode($_POST['_Data']);


    $Noti_Title=$Data->Noti_Title;
    $Noti_Content=$Data->Noti_Content;
    $Noti_Date=$Data->Noti_Date;
    $Noti_Time=$Data->Noti_Time;
    $Admin_Id=$Data->Admin_Id;
    $User_Id=$Data->User_Id;
    // echo 'data = '.json_encode($Data);
    // echo 'User_id.length = '.count($User_Id);
    echo '$File = '.count($_FILES);
    try {
        if(count($_FILES)>0){
            echo'Ghe';
            $New_Name ="img_".uniqid().date('dmY_His')."_".'.jpg';
            $path="./image/".$New_Name;
            $Noti_Image = $New_Name;
            move_uploaded_file($_FILES['Profile_Image']['tmp_name'],$path);

            for($i = 0; $i<count($User_Id);$i++){
                $sql_query = "INSERT INTO notification(Noti_Title,Noti_Content,Noti_Date,Noti_Time,Admin_Id,User_Id,Noti_Image)
                VALUES ('$Noti_Title','$Noti_Content','$Noti_Date','$Noti_Time','$Admin_Id','$User_Id[$i]' ,'$Noti_Image')";
                // echo 'sql_query = '.$sql_query.'<br>';   
                $conn = getDB();
                $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                $rst =$conn->query($sql_query);
                // $Response_Data= $rst->fetchAll(PDO::FETCH_OBJ); 
            }
        }
        else{
            for($i = 0; $i<count($User_Id);$i++){
                $sql_query = "INSERT INTO notification(Noti_Title,Noti_Content,Noti_Date,Noti_Time,Admin_Id,User_Id)
                VALUES ('$Noti_Title','$Noti_Content','$Noti_Date','$Noti_Time','$Admin_Id','$User_Id[$i]')";
                // echo 'sql_query = '.$sql_query.'<br>';   
                $conn = getDB();
                $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                $rst =$conn->query($sql_query);
                // $Response_Data= $rst->fetchAll(PDO::FETCH_OBJ); 
            }
        }
        
       
        // $conn = getDB();
        // $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        // $rst =$conn->query($sql_query);
        // $Response_Data= $rst->fetchAll(PDO::FETCH_OBJ);    
        
        // if(!empty($Response_Data)){
        //     // echo("dddddddddddddddddddd");
        //     $Response_Data = json_encode($Response_Data);
        //     echo '{"CanNot": ' .$Response_Data . '}';
    
        // }      
        // else{
        //     $New_Name ="img_".uniqid().date('dmY_His')."_".'.jpg';
        //     $path="./image/".$New_Name;
        //     $Profile = $New_Name;
        //     move_uploaded_file($_FILES['Profile_Image']['tmp_name'],$path);
        //     // echo $Profile_Image;
        //     // echo 'Run';
        //     $sql_query = "INSERT INTO users(User_Id,User_Pass,User_Name,User_Address,User_Phone,User_Email,User_Pic)
        //      VALUES ('$Username','$Password','$Name','$Adress','$Phone','$Email' ,'$Profile')";
        //     $conn = getDB();
        //     $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        //     $rst =$conn->query($sql_query);
        //     echo '{"State":[{"st":"jj"}]}';         
        // }
    }
    catch(PDOException $e) {
        echo 'error: '. $e->getMessage();
    }
}
// INSERT INTO knowledge(Know_Name,Know_Content,Know_Date,Know_Time,T_Know_Id,Animal_Id,Admin_Id) VALUES
// ('Hello','เนื้อหา','2561-11-8','19:48','2','2','admin')

// // echo strrchr($_FILES['Image_Knowledge']['name'],"."); //นามสกุล file เช่น jpg.png


?>