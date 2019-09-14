<?php
include 'config.php';
include 'Slim/Slim.php';

\Slim\Slim::registerAutoloader();
$app = new \Slim\Slim();
// $app = new \Slim\App;
// $container = $app->getContainer();
// $container['upload_directory'] = __DIR__ . '/uploads';


$app->post('/Login','Login');
$app->post('/Register','Register');

$app->post('/Get_Animals','Get_Animals');
//Knowledge
$app->post('/Get_Know_Data','Get_know_Data');
$app->post('/Get_Know_Type','Get_Know_Type');
$app->post('/Get_News_Type','Get_News_Type');
$app->post('/Get_News_Data','Get_News_Data');
$app->post('/Get_Farm_Data','Get_Farm_Data');
$app->post('/Get_MyProduct_Data','Get_MyProduct_Data');
$app->post('/Get_Posts_Data','Get_Posts_Data');
$app->post('/Get_Comments_Data','Get_Comments_Data');
$app->post('/Get_Users','Get_Users');
$app->post('/Get_Login_Data','Get_Login_Data');

$app->post('/Get_Market_Data','Get_Market_Data');
$app->post('/Get_Market_Ofme_Data','Get_Market_Ofme_Data');


$app->post('/Get_Market_Type','Get_Market_Type');
$app->post('/Get_Posts_Type','Get_Posts_Type');

$app->post('/Chang_User_Pass','Chang_User_Pass');
$app->post('/Chang_Admin_Pass','Chang_Admin_Pass');
$app->post('/Chang_Admin_Personal','Chang_Admin_Personal');

$app->post('/Add_Suggestion','Add_Suggestion');
$app->post('/Get_Suggestion','Get_Suggestion');
$app->post('/Get_Notification','Get_Notification');
$app->post('/Change_Nofification','Change_Nofification');


$app->post('/Farm_Allow','Farm_Allow');
$app->post('/MyFarm','MyFarm');

// News
$app->post('/Get_News_Type','Get_News_Type');
$app->post('/Get_Notification_private','Get_Notification_private');


$app->post('/Change_Animals_Type','Change_Animals_Type');
$app->post('/Change_Knowledge_Type','Change_Knowledge_Type');
$app->post('/Change_News_Type','Change_News_Type');
$app->post('/Change_Market_Type','Change_Market_Type');
$app->post('/Change_Posts_Type','Change_Posts_Type');


$app->post('/Add_Animals_Type','Add_Animals_Type');
$app->post('/Add_Knowledge_Type','Add_Knowledge_Type');
$app->post('/Add_News_Type','Add_News_Type');
$app->post('/Add_Market_Type','Add_Market_Type');
$app->post('/Add_Posts_Type','Add_Posts_Type');
$app->post('/Add_Notification','Add_Notification');


$app->post('/Delete_Animals_Type','Delete_Animals_Type');
$app->post('/Delete_Knowledge_Type','Delete_Knowledge_Type');
$app->post('/Delete_News_Type','Delete_News_Type');
$app->post('/Delete_Market_Type','Delete_Market_Type');
$app->post('/Delete_Posts_Type','Delete_Posts_Type');


$app->run();

//---------------------------------- Login ----------------------------//
function Login(){
    // echo 'Hello login';
    // print_r("Hello login");
    $request = \Slim\Slim::getInstance()->request();
    $data = json_decode($request->getBody());
    // $data = $request->getBody();
    // echo 'Hello login';
    $username=$data->username;
    // echo 'username is '.$username ;
    $password=$data->password;
    $password = md5($password);
    // echo $password;
    $Response_Data = array();    
    try {
              
        $sql_query = "SELECT * from admin where Admin_Id='$username' and Admin_Pass='$password'";
        $conn = getDB();
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $rst =$conn->query($sql_query);
        $Response_Data= $rst->fetchAll(PDO::FETCH_OBJ);    
        
        if(!empty($Response_Data)){
            // echo("dddddddddddddddddddd");
            $Response_Data = json_encode($Response_Data);
            echo '{"Admin": ' .$Response_Data . '}';
            // echo $Response_Data;
    
        }      
        else{
            $sql_query = "SELECT * from users where User_Id='$username' and User_Pass='$password'";
            $conn = getDB();
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $rst =$conn->query($sql_query);
            $Response_Data= $rst->fetchAll(PDO::FETCH_OBJ);
            if(!empty($Response_Data)){
                $Response_Data = json_encode($Response_Data);
                echo '{"Users": ' .$Response_Data . '}';
            }
            else{
                $Response_Data = json_encode($user_doctor);
                echo '{"Null": ' .$Response_Data . '}';
            }
        }
    }
    catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
}

//---------------------------------- Register ----------------------------//
function Register(){
    $request = \Slim\Slim::getInstance()->request();
    $data = json_decode($request->getBody());
    $Username=$data->Username;
    $Password=$data->Password;
    $Password = md5($Password);
    $Name=$data->Name;
    $Adress=$data->Adress;
    $Phone=$data->Phone;
    $Email=$data->Email;
    $Profile = $data->Profile;
    $Response_Data = array();  
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

function Add_Suggestion(){
    $request = \Slim\Slim::getInstance()->request();
    $data = json_decode($request->getBody());
    $Sug_Name=$data->Sug_Name;
    $Sug_Content=$data->Sug_Content;
    $User_Id=$data->User_Id;
    try {
        // echo 'Run';
        $sql_query = "INSERT INTO suggestion(Sug_Name,Sug_Content,User_Id)
         VALUES ('$Sug_Name','$Sug_Content','$User_Id')";
        $conn = getDB();
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $rst =$conn->query($sql_query);
        echo '{"Finish":"dd"}'; 
    }
    catch(PDOException $e) {
        echo 'error: '. $e->getMessage();
    }
}
function Add_Notification(){
    $request = \Slim\Slim::getInstance()->request();
    $data = json_decode($request->getBody());

    $Noti_Title=$data->Noti_Title;
    $Noti_Content=$data->Noti_Content;
    $Noti_Date=$data->Noti_Date;
    $Noti_Time=$data->Noti_Time;
    $User_Id=$data->User_Id;
    $Admin_Id=$data->Admin_Id;
    try {
        // echo 'Run';
        $sql_query = "INSERT INTO notification(Noti_Title,Noti_Content,Noti_Date,Noti_Time,User_Id,Admin_Id)
         VALUES ('$Noti_Title','$Noti_Content','$Noti_Date','$Noti_Time','$User_Id','$Admin_Id')";
        $conn = getDB();
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $rst =$conn->query($sql_query);
        echo '{"Finish":"dd"}'; 
    }
    catch(PDOException $e) {
        echo 'error: '. $e->getMessage();
    }
}
function Get_Suggestion(){
    $request = \Slim\Slim::getInstance()->request();
    $data = json_decode($request->getBody());
    // echo "data = ".$data;
    // $Search_Data=$data; 
    // echo 'Search is '.$Search_Data;
    $Response_Data = array();    
    try {  
            $sql_query = "SELECT * from suggestion";
            $conn = getDB();
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $rst =$conn->query($sql_query);
            $Response_Data= $rst->fetchAll(PDO::FETCH_OBJ);  

            $Response_Data = json_encode($Response_Data);
            echo '{"suggestion": ' .$Response_Data . '}';         
    }
    catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
}
function Get_Notification(){
    $request = \Slim\Slim::getInstance()->request();
    $data = json_decode($request->getBody());
    // echo "data = ".$data;
    // $Search_Data=$data; 
    // echo 'Search is '.$Search_Data;
    $Response_Data = array();    
    $Response_Img_Data = array();
    try {  
        $sql_query = "SELECT * from news where T_News_Id='1' ORDER BY News_Id DESC";
        $conn = getDB();
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $rst =$conn->query($sql_query);
        $Response_Data= $rst->fetchAll(PDO::FETCH_OBJ);  
        if($Response_Data.News_Data){
            // $Response_Data = json_encode($Response_Data);
            // echo '{"Knowledge_Data": ' .$Response_Data .','.'"xxx": '.$Response_Data .'}';
            // echo $Response_Data[$i]->News_Id;
            for($i=0;$i<count($Response_Data);$i++){
                // echo 'Response_Data = '.$Response_Data[$i]->Know_Id;
                $sql_query = "SELECT Img_News_Name from image_news where News_Id='".$Response_Data[$i]->News_Id."'";
                // echo "sql_query = ".$sql_query;
                $conn = getDB();
                $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                $rst =$conn->query($sql_query);
                $image = $rst->fetchAll(PDO::FETCH_OBJ);
                // echo 'Image = '.$image.'<br>';
                array_push($Response_Img_Data,$image);        
            }
            $Response_Data = json_encode($Response_Data);
            $Response_Img_Data = json_encode($Response_Img_Data);
            // echo $Response_Img_Data;
            echo '{"News_Data": ' .$Response_Data .','.'"News_Image": '.$Response_Img_Data .'}';     
        }   
    }
    catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
}
function Get_Notification_private(){
    $request = \Slim\Slim::getInstance()->request();
    $data = json_decode($request->getBody());
    $User_Id = $data->User_Id;
    $Response_Data = array();    
    $Response_Img_Data = array();
    try {  
        $sql_query = "SELECT * from notification where User_Id='$User_Id' ORDER BY Noti_Id DESC";
        $conn = getDB();
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $rst =$conn->query($sql_query);
        $Response_Data= $rst->fetchAll(PDO::FETCH_OBJ);  
        if($Response_Data){
            $Response_Data = json_encode($Response_Data);
            $Response_Img_Data = json_encode($Response_Img_Data);
            // echo $Response_Img_Data;
            echo '{"Noti_Data": ' .$Response_Data.'}';     
        }   
        else{
            echo '{"empty":"ddd"}';
        }
    }
    catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
}
function Change_Nofification(){
    $request = \Slim\Slim::getInstance()->request();
    $data = json_decode($request->getBody());
    $User_Noti_State = $data->User_Noti_State;
    $User_Id = $data->User_Id;
    // echo json_encode($data);
    $Response_Data = array();  
    try {           
        $sql_query = "UPDATE users set User_Noti_State='$User_Noti_State' WHERE User_Id='$User_Id'";
        $conn = getDB();
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $conn->query($sql_query);
        // echo '{"Admin_Data": ' .$Response_Data . '}'; 
        echo '{"Finish":"d"}';
    }
    catch(PDOException $e) {
        echo 'error: '. $e->getMessage();
    }
}
//---------------------------------- Get_knowledge_Data ----------------------------//
function Get_Know_Data(){
    $request = \Slim\Slim::getInstance()->request();
    $data = json_decode($request->getBody());
    // echo 'data = '.$data->AnimalsType;
    $Search_Data=$data->AnimalsType; 
    $Search_Data2=$data->KnowledgeType;
    // echo 'KnowledgeType = '.$Search_Data2.'   End';
    $Response_Data = array(); 
    $Response_Img_Data = array();
    $Animal_Name = array();
    $Knowledge_Type = array();
    $Know_T_Name = array();
    $sql_query = "SELECT * from knowledge where 1";  
    $sql_query1 ="";
    $sql_query2 ="";
    $state1='true'; // is Animal_Type
    $state2='true'; // is Knowledge_Type
    try {
        // SELECT * from knowledge where 1 and (Animal_Id='1')  and (T_Know_Id='1' or T_Know_Id='2')
        for($i=0;$i<count($Search_Data);$i++){
            // echo 'index['.$i.'] = '.$Search_Data[$i].'  ';
            if($Search_Data[$i]==all){
                // $sql_query = "SELECT * from knowledge where 1";     
                break;
                $state1='true';
            }
            else if($i<count($Search_Data)-1){      
                $state1='false';    
                $sql_query1 .="Animal_Id='".$Search_Data[$i]."'"." or ";
            }
            else{
                $state1='false';
                $sql_query1 .="Animal_Id='".$Search_Data[$i]."'";  
            }
        }
        for($i=0;$i<count($Search_Data2);$i++){
            // echo 'index['.$i.'] = '.$Search_Data[$i].'  ';
            if($Search_Data2[$i]==all){
                // $sql_query = "SELECT * from knowledge where 1";     
                break;
                $state2='true';
            }
            else if($i<count($Search_Data2)-1){      
                $state2='false';    
                $sql_query2 .="T_Know_Id='".$Search_Data2[$i]."'"." or ";
            }
            else{
                $state2='false';
                $sql_query2 .="T_Know_Id='".$Search_Data2[$i]."'";  
            }
        }

        if($state1=='false'){
            $sql_query.=" and (".$sql_query1 .")";
        }
        if($state2=='false'){
            $sql_query.=" and (".$sql_query2 .")";
        }
        $sql_query.=" ORDER BY Know_Id DESC"; // For Request data from more to less
        // echo "sql = ".$sql_query;
        $conn = getDB();
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $rst =$conn->query($sql_query);
        $Response_Data= $rst->fetchAll(PDO::FETCH_OBJ);  

        
        if($Response_Data.Knowledge_Data){
            // $Response_Data = json_encode($Response_Data);
            // echo '{"Knowledge_Data": ' .$Response_Data .','.'"xxx": '.$Response_Data .'}';

            for($i=0;$i<count($Response_Data);$i++){
                // echo 'Response_Data = '.$Response_Data[$i]->Know_Id;
                $sql_query = "SELECT Img_Know_Name from image_knowledge where Know_Id='".$Response_Data[$i]->Know_Id."'";
                // echo "sql_query = ".$sql_query;
                $conn = getDB();
                $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                $rst =$conn->query($sql_query);
                $image = $rst->fetchAll(PDO::FETCH_OBJ);
                // echo 'Image = '.$image;       
                
                array_push($Response_Img_Data,[]); 
                array_push($Response_Img_Data[$i],$image);
                array_push($Response_Img_Data[$i],$Response_Data[$i]->Know_Name);
            }

            for($i=0;$i<count($Response_Data);$i++){
                // $Animal_Name = array();
                // $Knowledge_Type = array();
                // echo 'Response_Data = '.$Response_Data[$i]->Know_Id;
                $sql_query = "SELECT Animal_Name from animals where Animal_Id='".$Response_Data[$i]->Animal_Id."'";
                // echo "sql_query = ".$sql_query;
                $conn = getDB();
                $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                $rst =$conn->query($sql_query);
                $Ani_Name = $rst->fetchAll(PDO::FETCH_OBJ);
                // echo 'Image = '.$image;
                array_push($Animal_Name,$Ani_Name);
                array_push($Animal_Name[$i],$Response_Data[$i]->Know_Name);
            }

            for($i=0;$i<count($Response_Data);$i++){
                // $Animal_Name = array();
                // $Knowledge_Type = array();
                // echo 'Response_Data = '.$Response_Data[$i]->Know_Id;
                $sql_query = "SELECT T_Know_Name from type_knowledge where T_Know_Id='".$Response_Data[$i]->T_Know_Id."'";
                // echo "sql_query = ".$sql_query;
                $conn = getDB();
                $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                $rst =$conn->query($sql_query);
                $Ani_T_Name = $rst->fetchAll(PDO::FETCH_OBJ);
                // echo 'Ani_T_Name = '.$Ani_T_Name;
                array_push($Know_T_Name,$Ani_T_Name);
                // echo 'Know_Name ====== '. $Response_Data[$i]->Know_Name;
                // array_push($Know_T_Name[$i],$Response_Data);
                array_push($Know_T_Name[$i],$Response_Data[$i]->Know_Name);
                // echo json_encode($Response_Data[$i]);
                
            }

            ///////////////////////////////////////////////////////
            $Response_Data = json_encode($Response_Data);
            $Response_Img_Data = json_encode($Response_Img_Data);
            $Animal_Name = json_encode($Animal_Name);
            $Know_T_Name = json_encode($Know_T_Name);
            // echo $Response_Data;
            // echo json_encode($Response_Data[0]);
            echo '{"Knowledge_Data": ' .$Response_Data .','.'"Knowledge_Image": '.$Response_Img_Data.',','"Animal_Name":'.$Animal_Name.',','"Know_T_Name":'.$Know_T_Name.'}';

        }
        /////////////////// End Doing/////////////////
        else{
            $Response_Data = json_encode($Response_Data);
            echo '{"Null": ' .$Response_Data . '}';
        }   
    }
    catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
}

function Get_News_Data(){
    // $str = 'dddd';
    // echo 'md5 = '.md5($str);
    $request = \Slim\Slim::getInstance()->request();
    $data = json_decode($request->getBody());
    $Search_Data=$data->AnimalsType; 
    $Search_Data2=$data->NewsType;
    // echo 'KnowledgeType = '.$Search_Data2.'   End';
    $Response_Data = array(); 
    $Response_Img_Data = array();
    $sql_query = "SELECT * from news where 1";  
    $sql_query1 ="";
    $sql_query2 ="";
    $state1='true';
    $state2='true';
    try {
        // SELECT * from knowledge where 1 and (Animal_Id='1')  and (T_Know_Id='1' or T_Know_Id='2')
        for($i=0;$i<count($Search_Data);$i++){
            // echo 'index['.$i.'] = '.$Search_Data[$i].'  ';
            if($Search_Data[$i]==all){
                // $sql_query = "SELECT * from knowledge where 1";     
                break;
                $state1='true';
            }
            else if($i<count($Search_Data)-1){      
                $state1='false';    
                $sql_query1 .="Animal_Id='".$Search_Data[$i]."'"." or ";
            }
            else{
                $state1='false';
                $sql_query1 .="Animal_Id='".$Search_Data[$i]."'";  
            }
        }
        for($i=0;$i<count($Search_Data2);$i++){
            // echo 'index['.$i.'] = '.$Search_Data[$i].'  ';
            if($Search_Data2[$i]==all){
                // $sql_query = "SELECT * from knowledge where 1";     
                break;
                $state2='true';
            }
            else if($i<count($Search_Data2)-1){      
                $state2='false';    
                $sql_query2 .="T_News_Id='".$Search_Data2[$i]."'"." or ";
            }
            else{
                $state2='false';
                $sql_query2 .="T_News_Id='".$Search_Data2[$i]."'";  
            }
        }

        if($state1=='false'){
            $sql_query.=" and (".$sql_query1 .")";
        }
        if($state2=='false'){
            $sql_query.=" and (".$sql_query2 .")";
        }
        $sql_query.=" ORDER BY News_Id DESC"; // For Request data from more to less
        // echo "sql = ".$sql_query;
        $conn = getDB();
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $rst =$conn->query($sql_query);
        $Response_Data= $rst->fetchAll(PDO::FETCH_OBJ);
        // echo json_encode($Response_Data.News_Data);  
        if($Response_Data.News_Data){
            // $Response_Data = json_encode($Response_Data);
            // echo '{"Knowledge_Data": ' .$Response_Data .','.'"xxx": '.$Response_Data .'}';
            // echo $Response_Data[$i]->News_Id;
            for($i=0;$i<count($Response_Data);$i++){
                // echo 'Response_Data = '.$Response_Data[$i]->Know_Id;
                $sql_query = "SELECT Img_News_Name from image_news where News_Id='".$Response_Data[$i]->News_Id."'";
                // echo "sql_query = ".$sql_query;
                $conn = getDB();
                $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                $rst =$conn->query($sql_query);
                $image = $rst->fetchAll(PDO::FETCH_OBJ);
                // echo 'Image = '.$image.'<br>';
                // array_push($Response_Img_Data,$image);
                array_push($Response_Img_Data,[]); 
                array_push($Response_Img_Data[$i],$image);
                array_push($Response_Img_Data[$i],$Response_Data[$i]->News_Name);
                
            }
            // echo json_encode($Response_Img_Data);
            $Response_Data = json_encode($Response_Data);
            $Response_Img_Data = json_encode($Response_Img_Data);
            // echo $Response_Img_Data;
            echo '{"News_Data": ' .$Response_Data .','.'"News_Image": '.$Response_Img_Data .'}';
        }
        else{
            $Response_Data = json_encode($Response_Data);
            echo '{"Null": ' .$Response_Data . '}';
        }   
    }
    catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
}
//---------------------------------------- Get_Farm_Data -------------------------------//
function Get_Farm_Data(){
    $request = \Slim\Slim::getInstance()->request();
    $data = json_decode($request->getBody());
    // echo "data = ".$data;
    // $Search_Data=$data; 
    // echo 'Search is '.$Search_Data;
    $Response_Data = array();   
    $Response_Img_Data = array(); 
    try {  
        $sql_query = "SELECT * from farm where Farm_State='1'";
        $conn = getDB();
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $rst =$conn->query($sql_query);
        $Response_Data= $rst->fetchAll(PDO::FETCH_OBJ);  
        // $Response_Data = json_encode($Response_Data);
        // echo '{"Farm": ' .$Response_Data . '}';    
        if($Response_Data.Farm_Data){
            // $Response_Data = json_encode($Response_Data);
            // echo '{"Knowledge_Data": ' .$Response_Data .','.'"xxx": '.$Response_Data .'}';
            // echo $Response_Data[$i]->News_Id;
            for($i=0;$i<count($Response_Data);$i++){
                // echo 'Response_Data = '.$Response_Data[$i]->Farm_Id;
                $sql_query = "SELECT Img_Farm_Name from image_farm where Farm_Id='".$Response_Data[$i]->Farm_Id."'";
                // echo "sql_query = ".$sql_query;
                $conn = getDB();
                $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                $rst =$conn->query($sql_query);
                $image = $rst->fetchAll(PDO::FETCH_OBJ);
                // echo 'Image = '.json_encode($image).'<br>';
                // array_push($Response_Img_Data,$image);
                array_push($Response_Img_Data,[]); 
                array_push($Response_Img_Data[$i],$image);
                array_push($Response_Img_Data[$i],$Response_Data[$i]->Farm_Name);
                
            }
            // echo json_encode($Response_Img_Data);
            $Response_Data = json_encode($Response_Data);
            $Response_Img_Data = json_encode($Response_Img_Data);
            // echo $Response_Img_Data;
            echo '{"Farm_Data": ' .$Response_Data .','.'"Farm_Image": '.$Response_Img_Data .'}';
        }
        else{
            $Response_Data = json_encode($Response_Data);
            echo '{"Null": ' .$Response_Data . '}';
        }   
                 
    }
    catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
}
//---------------------------------------- Get_Market_Data -------------------------------//
function Get_Market_Data(){
    $request = \Slim\Slim::getInstance()->request();
    $data = json_decode($request->getBody());
    // $Search_Data=$data->AnimalsType; 
    $Search_Data2=$data->MarketType;
    // echo 'MarketType = '.$Search_Data2[0].'   End';
    $Response_Data = array(); 
    $Response_Img_Data = array();
    $sql_query = "SELECT * from market where 1";  
    $sql_query2 ="";
    // $state1='true';
    $state2='true';
    try {
        // SELECT * from knowledge where 1 and (T_Know_Id='1' or T_Know_Id='2')
        for($i=0;$i<count($Search_Data2);$i++){
            // echo 'index['.$i.'] = '.$Search_Data[$i].'  ';
            if($Search_Data2[$i]==all){
                // $sql_query = "SELECT * from knowledge where 1";     
                break;
                $state2='true';
            }
            else if($i<count($Search_Data2)-1){      
                $state2='false';    
                $sql_query2 .="T_Market_Id='".$Search_Data2[$i]."'"." or ";
            }
            else{
                $state2='false';
                $sql_query2 .="T_Market_Id='".$Search_Data2[$i]."'";  
                // echo 'sql_query2 = '.$sql_query2;
            }
        }

        if($state2=='false'){
            $sql_query.=" and (".$sql_query2 .")";
        }
        $sql_query.=" ORDER BY Market_Id DESC"; // For Request data from more to less
        // echo "sql = ".$sql_query;
        $conn = getDB();
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $rst =$conn->query($sql_query);
        $Response_Data= $rst->fetchAll(PDO::FETCH_OBJ);
        // echo json_encode($Response_Data.Market_Data);  
        if($Response_Data.Market_Data){
            // $Response_Data = json_encode($Response_Data);
            // echo '{"Knowledge_Data": ' .$Response_Data .','.'"xxx": '.$Response_Data .'}';
            // echo $Response_Data[$i]->Market_Id;
            for($i=0;$i<count($Response_Data);$i++){
                // echo 'Response_Data = '.$Response_Data[$i]->Know_Id;
                $sql_query = "SELECT Img_Market_Name from image_market where Market_Id='".$Response_Data[$i]->Market_Id."'";
                // echo "sql_query = ".$sql_query;
                $conn = getDB();
                $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                $rst =$conn->query($sql_query);
                $image = $rst->fetchAll(PDO::FETCH_OBJ);
                // echo 'Image = '.$image.'<br>';
                // array_push($Response_Img_Data,$image);
                array_push($Response_Img_Data,[]); 
                array_push($Response_Img_Data[$i],$image);
                array_push($Response_Img_Data[$i],$Response_Data[$i]->Market_Name);
                
            }
            // echo json_encode($Response_Img_Data);
            $Response_Data = json_encode($Response_Data);
            $Response_Img_Data = json_encode($Response_Img_Data);
            // echo $Response_Img_Data;
            echo '{"Market_Data": ' .$Response_Data .','.'"Market_Image": '.$Response_Img_Data .'}';
        }
        else{
            $Response_Data = json_encode($Response_Data);
            echo '{"Null": ' .$Response_Data . '}';
        }   
    }
    catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
}

function Get_Market_Ofme_Data(){
    $request = \Slim\Slim::getInstance()->request();
    $data = json_decode($request->getBody());
    // $Search_Data=$data->AnimalsType; 
    $Search_Data2=$data->MarketType;
    $User_Id = $data->User_Id;
    // echo 'MarketType = '.$Search_Data2[0].'   End';
    $Response_Data = array(); 
    $Response_Img_Data = array();
    $sql_query = "SELECT * from market where 1 ";  
    $sql_query2 ="";
    // $state1='true';
    $state2='true';
    try {
        // SELECT * from knowledge where 1 and (T_Know_Id='1' or T_Know_Id='2')
        for($i=0;$i<count($Search_Data2);$i++){
            // echo 'index['.$i.'] = '.$Search_Data[$i].'  ';
            if($Search_Data2[$i]==all){
                // $sql_query = "SELECT * from knowledge where 1";     
                break;
                $state2='true';
            }
            else if($i<count($Search_Data2)-1){      
                $state2='false';    
                $sql_query2 .="T_Market_Id='".$Search_Data2[$i]."'"." or ";
            }
            else{
                $state2='false';
                $sql_query2 .="T_Market_Id='".$Search_Data2[$i]."'";  
                // echo 'sql_query2 = '.$sql_query2;
            }
        }

        if($state2=='false'){
            $sql_query.=" and (".$sql_query2 .")";
        }
        $sql_query.=" and User_Id ='".$User_Id."' ORDER BY Market_Id DESC"; // For Request data from more to less
        // echo "sql = ".$sql_query;
        $conn = getDB();
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $rst =$conn->query($sql_query);
        $Response_Data= $rst->fetchAll(PDO::FETCH_OBJ);
        // echo json_encode($Response_Data.Market_Data);  
        if($Response_Data.Market_Data){
            // $Response_Data = json_encode($Response_Data);
            // echo '{"Knowledge_Data": ' .$Response_Data .','.'"xxx": '.$Response_Data .'}';
            // echo $Response_Data[$i]->Market_Id;
            for($i=0;$i<count($Response_Data);$i++){
                // echo 'Response_Data = '.$Response_Data[$i]->Know_Id;
                $sql_query = "SELECT Img_Market_Name from image_market where Market_Id='".$Response_Data[$i]->Market_Id."'";
                // echo "sql_query = ".$sql_query;
                $conn = getDB();
                $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                $rst =$conn->query($sql_query);
                $image = $rst->fetchAll(PDO::FETCH_OBJ);
                // echo 'Image = '.$image.'<br>';
                // array_push($Response_Img_Data,$image);
                array_push($Response_Img_Data,[]); 
                array_push($Response_Img_Data[$i],$image);
                array_push($Response_Img_Data[$i],$Response_Data[$i]->Market_Name);
                
            }
            // echo json_encode($Response_Img_Data);
            $Response_Data = json_encode($Response_Data);
            $Response_Img_Data = json_encode($Response_Img_Data);
            // echo $Response_Img_Data;
            echo '{"Market_Data": ' .$Response_Data .','.'"Market_Image": '.$Response_Img_Data .'}';
        }
        else{
            $Response_Data = json_encode($Response_Data);
            echo '{"Null": ' .$Response_Data . '}';
        }   
    }
    catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
}

function Get_MyProduct_Data(){
    $request = \Slim\Slim::getInstance()->request();
    $data = json_decode($request->getBody());
    // echo "data = ".json_encode($data);
    $User_Id=$data->User_Id; 
    echo 'User_Id = '.$data;
    $Response_Data = array();   
    $Response_Img_Data = array(); 
    try {  
        $sql_query = "SELECT * from market where User_Id='$User_Id'";
        $conn = getDB();
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $rst =$conn->query($sql_query);
        $Response_Data= $rst->fetchAll(PDO::FETCH_OBJ);  
        // $Response_Data = json_encode($Response_Data);
        // echo '{"Market": ' .$Response_Data . '}';    
        if($Response_Data.Market_Data){
            // $Response_Data = json_encode($Response_Data);
            // echo '{"Knowledge_Data": ' .$Response_Data .','.'"xxx": '.$Response_Data .'}';
            // echo $Response_Data[$i]->News_Id;
            for($i=0;$i<count($Response_Data);$i++){
                // echo 'Response_Data = '.$Response_Data[$i]->Market_Id;
                $sql_query = "SELECT Img_Market_Name from image_market where Market_Id='".$Response_Data[$i]->Market_Id."'";
                // echo "sql_query = ".$sql_query;
                $conn = getDB();
                $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                $rst =$conn->query($sql_query);
                $image = $rst->fetchAll(PDO::FETCH_OBJ);
                // echo 'Image = '.json_encode($image).'<br>';
                array_push($Response_Img_Data,$image);
                
            }
            // echo json_encode($Response_Img_Data);
            $Response_Data = json_encode($Response_Data);
            $Response_Img_Data = json_encode($Response_Img_Data);
            // echo $Response_Img_Data;
            // echo '{"Market_Data": ' .$Response_Data .','.'"Market_Image": '.$Response_Img_Data .'}';
        }
        else{
            $Response_Data = json_encode($Response_Data);
            echo '{"Null": ' .$Response_Data . '}';
        }   
                 
    }
    catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
}
function Get_Posts_Data(){
    $request = \Slim\Slim::getInstance()->request();
    $data = json_decode($request->getBody());
    $Search_Data=$data->AnimalsType;
    $Search_Data2=$data->PostsType;
    // echo 'KnowledgeType = '.$Search_Data2.'   End';
    $Response_Data = array(); 
    $Response_Img_Data = array();
    $Name=array();
    $sql_query = "SELECT * from posts where 1";  
    $sql_query1 ="";
    $sql_query2 ="";
    $state1='true';
    $state2='true';
    try {
        // SELECT * from knowledge where 1 and (Animal_Id='1')  and (T_Know_Id='1' or T_Know_Id='2')
        for($i=0;$i<count($Search_Data);$i++){
            // echo 'index['.$i.'] = '.$Search_Data[$i].'  ';
            if($Search_Data[$i]==all){
                // $sql_query = "SELECT * from knowledge where 1";     
                break;
                $state1='true';
            }
            else if($i<count($Search_Data)-1){      
                $state1='false';    
                $sql_query1 .="Animal_Id='".$Search_Data[$i]."'"." or ";
            }
            else{
                $state1='false';
                $sql_query1 .="Animal_Id='".$Search_Data[$i]."'";  
            }
        }
        for($i=0;$i<count($Search_Data2);$i++){
            // echo 'index['.$i.'] = '.$Search_Data[$i].'  ';
            if($Search_Data2[$i]==all){
                // $sql_query = "SELECT * from knowledge where 1";     
                break;
                $state2='true';
            }
            else if($i<count($Search_Data2)-1){      
                $state2='false';    
                $sql_query2 .="T_Posts_Id='".$Search_Data2[$i]."'"." or ";
            }
            else{
                $state2='false';
                $sql_query2 .="T_Posts_Id='".$Search_Data2[$i]."'";  
            }
        }

        if($state1=='false'){
            $sql_query.=" and (".$sql_query1 .")";
        }
        if($state2=='false'){
            $sql_query.=" and (".$sql_query2 .")";
        }
        $sql_query.=" ORDER BY Posts_Id DESC"; // For Request data from more to less
        // echo "sql = ".$sql_query;
        $conn = getDB();
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $rst =$conn->query($sql_query);
        $Response_Data= $rst->fetchAll(PDO::FETCH_OBJ);
        // echo json_encode($Response_Data.Posts_Data);  
        if($Response_Data.Posts_Data){
            // $Response_Data = json_encode($Response_Data);
            // echo '{"Knowledge_Data": ' .$Response_Data .','.'"xxx": '.$Response_Data .'}';
            // echo $Response_Data[$i]->Posts_Id;
            for($i=0;$i<count($Response_Data);$i++){
                // echo 'Response_Data = '.$Response_Data[$i]->Know_Id;
                $sql_query = "SELECT Img_Posts_Name from image_posts where Posts_Id='".$Response_Data[$i]->Posts_Id."'";
                // echo "sql_query = ".$sql_query;
                $conn = getDB();
                $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                $rst =$conn->query($sql_query);
                $image = $rst->fetchAll(PDO::FETCH_OBJ);
                // echo 'Image = '.$image.'<br>';
                // array_push($Response_Img_Data,$image);

                array_push($Response_Img_Data,[]); 
                array_push($Response_Img_Data[$i],$image);
                array_push($Response_Img_Data[$i],$Response_Data[$i]->Posts_Name);
            }
            // $Response_Data = json_encode($Response_Data);
            
            for($i=0;$i<count($Response_Data);$i++){
                // echo json_encode($Response_Data[$i]);
                if($Response_Data[$i]->Admin_Id==null){
                    // echo 'User';
                    $User_Id = $Response_Data[$i]->User_Id;
                    // echo $Response_Data[$i]->User_Id;
                    $sql_query = "SELECT User_Name from users where User_Id='$User_Id'";
                    $conn = getDB();
                    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                    $rst =$conn->query($sql_query);
                    $user_name = $rst->fetchAll(PDO::FETCH_OBJ);
                    
                    array_push($Name,[]); 
                    array_push($Name[$i],$user_name[0]);
                    // echo json_encode($user_name[0]);
                    // echo json_encode($Name);
                    // array_push($Know_T_Name,$Ani_T_Name);
                    // echo 'Know_Name ====== '. $Response_Data[$i]->Know_Name;
                    // array_push($Know_T_Name[$i],$Response_Data);
                    // array_push($Name[$i],$Response_Data[$i]->Posts_Name);
                    array_push($Name[$i],$Response_Data[$i]->Posts_Name);
                }
                else{
                    $Admin_Id = $Response_Data[$i]->Admin_Id;
                    // echo $Response_Data[$i]->Admin_Id;
                    $sql_query = "SELECT Admin_Name from admin where Admin_Id='$Admin_Id'";
                    $conn = getDB();
                    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                    $rst =$conn->query($sql_query);
                    $Admin_name = $rst->fetchAll(PDO::FETCH_OBJ);
                    // array_push($Name,$Admin_name[0]);
                    array_push($Name,[]); 
                    array_push($Name[$i],$Admin_name[0]);

                    // array_push($Know_T_Name[$i],$Response_Data[$i]->Know_Name);

                    array_push($Name[$i],$Response_Data[$i]->Posts_Name);
                    // echo json_encode($Admin_name[0]);
                    // echo json_encode($Name);
                    // echo 'Admin';
                }
            }
            
            
            // echo json_encode($Response_Img_Data);
            $Response_Data = json_encode($Response_Data);
            $Response_Img_Data = json_encode($Response_Img_Data);
            $Name = json_encode($Name);
            // echo $Response_Img_Data;
            echo '{"Posts_Data": ' .$Response_Data .','.'"Posts_Image": '.$Response_Img_Data .','.'"Name": '.$Name.'}';
        }
        else{
            $Response_Data = json_encode($Response_Data);
            echo '{"Null": ' .$Response_Data . '}';
        }   
    }
    catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
}
function Get_Comments_Data(){
    $request = \Slim\Slim::getInstance()->request();
    $Posts_Id = json_decode($request->getBody());
    // $Posts_Id = $data->Posts_Id;
    // echo "data = ".$data;
   
    // $Search_Data=$data; 
    // echo 'Search is '.$Search_Data;
    $Response_Data = array();    
    $Response_Img_Data = array();
    $Name=array();
    try {  
            $sql_query = "SELECT * from comments where Posts_Id='$Posts_Id'";
            $conn = getDB();
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $rst =$conn->query($sql_query);
            $Response_Data= $rst->fetchAll(PDO::FETCH_OBJ);  
            // echo 'Res_Data = '.json_encode($Response_Data);;
            // $Response_Data = json_encode($Response_Data);
            // echo '{"Animals": ' .$Response_Data . '}';  
            if($Response_Data){
                for($i=0;$i<count($Response_Data);$i++){
                    // echo 'Response_Data = '.$Response_Data[$i]->Know_Id;
                    $sql_query = "SELECT Img_comment_Name from image_comment where comment_Id='".$Response_Data[$i]->comment_Id."'";
                    // echo "sql_query = ".$sql_query;
                    $conn = getDB();
                    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                    $rst =$conn->query($sql_query);
                    $image = $rst->fetchAll(PDO::FETCH_OBJ);
                    // echo 'Image = '.$image.'<br>';
                    array_push($Response_Img_Data,$image);
                }

                for($i=0;$i<count($Response_Data);$i++){
                    // echo json_encode($Response_Data[$i]);
                    if($Response_Data[$i]->Admin_Id==null){
                        // echo 'User';
                        $User_Id = $Response_Data[$i]->User_Id;
                        // echo $Response_Data[$i]->User_Id;
                        $sql_query = "SELECT User_Name from users where User_Id='$User_Id'";
                        $conn = getDB();
                        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                        $rst =$conn->query($sql_query);
                        $user_name = $rst->fetchAll(PDO::FETCH_OBJ);
                        array_push($Name,$user_name[0]);
                        // echo json_encode($user_name[0]);
                        // echo json_encode($Name);
    
                    }
                    else{
                        $Admin_Id = $Response_Data[$i]->Admin_Id;
                        // echo $Response_Data[$i]->Admin_Id;
                        $sql_query = "SELECT Admin_Name from admin where Admin_Id='$Admin_Id'";
                        $conn = getDB();
                        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                        $rst =$conn->query($sql_query);
                        $Admin_name = $rst->fetchAll(PDO::FETCH_OBJ);
                        array_push($Name,$Admin_name[0]);
                        // echo json_encode($Admin_name[0]);
                        // echo json_encode($Name);
                        // echo 'Admin';
                    }
                }

                 // echo json_encode($Response_Img_Data);
                $Response_Data = json_encode($Response_Data);
                $Response_Img_Data = json_encode($Response_Img_Data);
                $Name = json_encode($Name);
                echo '{"Comments": ' .$Response_Data .','.'"Comments_Image": '.$Response_Img_Data .','.'"Name": '.$Name.'}';


            }      
            else{
                echo '{"null":"d"}';
            } 
    }
    catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
}

function Get_Users(){
    $request = \Slim\Slim::getInstance()->request();
    $data = json_decode($request->getBody());
    // echo "data = ".$data;
    // $Search_Data=$data; 
    // echo 'Search is '.$Search_Data;
    $Response_Data = array();    
    try {  
            $sql_query = "SELECT * from users";
            $conn = getDB();
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $rst =$conn->query($sql_query);
            $Response_Data= $rst->fetchAll(PDO::FETCH_OBJ);  

            $Response_Data = json_encode($Response_Data);
            echo '{"User_Data": ' .$Response_Data . '}';         
    }
    catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
}

function Chang_User_Pass(){
    $request = \Slim\Slim::getInstance()->request();
    $data = json_decode($request->getBody());
    $Old_Password=$data->Old_Password;
    $Old_Password = md5($Old_Password);
    $New_Password=$data->New_Password;
    $New_Password = md5($New_Password);
    $User_Id = $data->User_Id;
    // echo json_encode($data);
    $Response_Data = array();  
    try {           
        $sql_query = "SELECT User_Pass from users where User_Id='$User_Id'";
        $conn = getDB();
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $rst =$conn->query($sql_query);
        $Response_Data= $rst->fetchAll(PDO::FETCH_OBJ);    
        // echo json_encode($Response_Data[0]->User_Pass);
        if($Old_Password==$Response_Data[0]->User_Pass){
            $sql_query = "UPDATE users set User_Pass='$New_Password' WHERE User_Id='$User_Id'";
            $conn = getDB();
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $conn->query($sql_query);
            echo json_encode($Response_Data[0]->User_Pass);
            // echo '{"Finish":"d"}';
        }
        else{
            echo '{"CanNot":"d"}';
        }
    }
    catch(PDOException $e) {
        echo 'error: '. $e->getMessage();
    }
}

function Chang_Admin_Pass(){
    $request = \Slim\Slim::getInstance()->request();
    $data = json_decode($request->getBody());
    $Old_Password=$data->Old_Password;
    $Old_Password = md5($Old_Password);
    $New_Password=$data->New_Password;
    $New_Password = md5($New_Password);
    $Admin_Id = $data->Admin_Id;
    // echo json_encode($data);
    $Response_Data = array();  
    try {           
        $sql_query = "SELECT Admin_Pass from admin where Admin_Id='$Admin_Id'";
        $conn = getDB();
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $rst =$conn->query($sql_query);
        $Response_Data= $rst->fetchAll(PDO::FETCH_OBJ);   
        // echo $Old_Password.'<br>'; 
        // echo json_encode($Response_Data[0]->Admin_Pass);
        
        if($Old_Password==$Response_Data[0]->Admin_Pass){
            $sql_query = "UPDATE admin set Admin_Pass='$New_Password' WHERE Admin_Id='$Admin_Id'";
            $conn = getDB();
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $conn->query($sql_query);
            echo json_encode($Response_Data[0]->Admin_Pass);
            // echo '{"Finish":"d"}';
        }
        else{
            echo '{"CanNot":"d"}';
        }
    }
    catch(PDOException $e) {
        echo 'error: '. $e->getMessage();
    }
}

function Chang_Admin_Personal(){
    $request = \Slim\Slim::getInstance()->request();
    $data = json_decode($request->getBody());
    $Admin_Name = $data->Admin_Name;
    $Admin_Id = $data->Admin_Id;
    // echo json_encode($data);
    $Response_Data = array();  
    try {           
        $sql_query = "UPDATE admin set Admin_Name='$Admin_Name' WHERE Admin_Id='$Admin_Id'";
        $conn = getDB();
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $conn->query($sql_query);

        $sql_query = "select * from admin where Admin_Id='$Admin_Id'";
        $conn = getDB();
        $rst = $conn->query($sql_query);
        $Response_Data= $rst->fetchAll(PDO::FETCH_OBJ);
        $Response_Data = json_encode($Response_Data);
        echo '{"Admin_Data": ' .$Response_Data . '}'; 
        // echo '{"Finish":"d"}';
    }
    catch(PDOException $e) {
        echo 'error: '. $e->getMessage();
    }
}

function Get_Login_Data(){
    $request = \Slim\Slim::getInstance()->request();
    $Data = json_decode($request->getBody());
    $User_Id = $Data->Username;
    $sql_query = "select * from users where User_Id='$User_Id'";
    $conn = getDB();
    $rst = $conn->query($sql_query);
    $Response_Data= $rst->fetchAll(PDO::FETCH_OBJ);
    $Response_Data = json_encode($Response_Data);
    echo '{"User_Data": ' .$Response_Data . '}'; 
}
//---------------------------------- Get_knowledge_Filter ----------------------------//

//---------------------------------- Get_Animals ----------------------------//
function Get_Animals(){
    $request = \Slim\Slim::getInstance()->request();
    $data = json_decode($request->getBody());
    // echo "data = ".$data;
    // $Search_Data=$data; 
    // echo 'Search is '.$Search_Data;
    $Response_Data = array();    
    try {  
            $sql_query = "SELECT * from animals";
            $conn = getDB();
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $rst =$conn->query($sql_query);
            $Response_Data= $rst->fetchAll(PDO::FETCH_OBJ);  

            $Response_Data = json_encode($Response_Data);
            echo '{"Animals": ' .$Response_Data . '}';         
    }
    catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
}
//---------------------------------- Get_Knowledge_Type ----------------------------//
function Get_Know_Type(){
    $request = \Slim\Slim::getInstance()->request();
    $data = json_decode($request->getBody());
    // echo "data = ".$data;
    // $Search_Data=$data; 
    // echo 'Search is '.$Search_Data;
    $Response_Data = array();    
    try {  
            $sql_query = "SELECT * from type_knowledge";
            $conn = getDB();
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $rst =$conn->query($sql_query);
            $Response_Data= $rst->fetchAll(PDO::FETCH_OBJ);  

            $Response_Data = json_encode($Response_Data);
            echo '{"Know_type": ' .$Response_Data . '}';         
    }
    catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
}
//---------------------------------- Get_News_Type ----------------------------//
function Get_News_Type(){
    $request = \Slim\Slim::getInstance()->request();
    $data = json_decode($request->getBody());
    // echo "data = ".$data;
    // $Search_Data=$data; 
    // echo 'Search is '.$Search_Data;
    $Response_Data = array();    
    try {  
            $sql_query = "SELECT * from type_news";
            $conn = getDB();
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $rst =$conn->query($sql_query);
            $Response_Data= $rst->fetchAll(PDO::FETCH_OBJ);  

            $Response_Data = json_encode($Response_Data);
            echo '{"News_type": ' .$Response_Data . '}';         
    }
    catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
}

function Get_Posts_Type(){
    $request = \Slim\Slim::getInstance()->request();
    $data = json_decode($request->getBody());
    // echo "data = ".$data;
    // $Search_Data=$data; 
    // echo 'Search is '.$Search_Data;
    $Response_Data = array();    
    try {  
            $sql_query = "SELECT * from type_posts";
            $conn = getDB();
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $rst =$conn->query($sql_query);
            $Response_Data= $rst->fetchAll(PDO::FETCH_OBJ);  

            $Response_Data = json_encode($Response_Data);
            echo '{"Posts_type": ' .$Response_Data . '}';         
    }
    catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
}

function Farm_Allow(){
    $request = \Slim\Slim::getInstance()->request();
    $data = json_decode($request->getBody());
    // echo "data = ".$data;
    // $Search_Data=$data; 
    // echo 'Search is '.$Search_Data;
    $Response_Data = array();   
    $Response_Img_Data = array(); 
    try {  
        $sql_query = "SELECT * from farm where Farm_State='0'";
        $conn = getDB();
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $rst =$conn->query($sql_query);
        $Response_Data= $rst->fetchAll(PDO::FETCH_OBJ);  
        // $Response_Data = json_encode($Response_Data);
        // echo '{"Farm": ' .$Response_Data . '}';    
        if($Response_Data.Farm_Data){
            // $Response_Data = json_encode($Response_Data);
            // echo '{"Knowledge_Data": ' .$Response_Data .','.'"xxx": '.$Response_Data .'}';
            // echo $Response_Data[$i]->News_Id;
            for($i=0;$i<count($Response_Data);$i++){
                // echo 'Response_Data = '.$Response_Data[$i]->Farm_Id;
                $sql_query = "SELECT Img_Farm_Name from image_farm where Farm_Id='".$Response_Data[$i]->Farm_Id."'";
                // echo "sql_query = ".$sql_query;
                $conn = getDB();
                $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                $rst =$conn->query($sql_query);
                $image = $rst->fetchAll(PDO::FETCH_OBJ);
                // echo 'Image = '.json_encode($image).'<br>';
                array_push($Response_Img_Data,$image);
                
            }
            // echo json_encode($Response_Img_Data);
            $Response_Data = json_encode($Response_Data);
            $Response_Img_Data = json_encode($Response_Img_Data);
            // echo $Response_Img_Data;
            echo '{"Farm_Data": ' .$Response_Data .','.'"Farm_Image": '.$Response_Img_Data .'}';
        }
        else{
            $Response_Data = json_encode($Response_Data);
            echo '{"Null": ' .$Response_Data . '}';
        }   
                 
    }
    catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
}

function Get_Market_Type(){
    $request = \Slim\Slim::getInstance()->request();
    $data = json_decode($request->getBody());
    // echo "data = ".$data;
    // $Search_Data=$data; 
    // echo 'Search is '.$Search_Data;
    $Response_Data = array();    
    try {  
            $sql_query = "SELECT * from type_market";
            $conn = getDB();
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $rst =$conn->query($sql_query);
            $Response_Data= $rst->fetchAll(PDO::FETCH_OBJ);  

            $Response_Data = json_encode($Response_Data);
            echo '{"Market_type": ' .$Response_Data . '}';         
    }
    catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
}


function MyFarm(){ 
    $request = \Slim\Slim::getInstance()->request();
    $data = json_decode($request->getBody());
    // echo "data = ".json_encode($data);
    $User_Id=$data->User_Id; 
    // echo 'User_Id = '.json_encode($data);
    $Response_Data = array();   
    $Response_Img_Data = array(); 
    try {  
        $sql_query = "SELECT * from farm where User_Id='$User_Id'";
        $conn = getDB();
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $rst =$conn->query($sql_query);
        $Response_Data= $rst->fetchAll(PDO::FETCH_OBJ);  
        // $Response_Data = json_encode($Response_Data);
        // echo '{"Farm": ' .$Response_Data . '}';    
        if($Response_Data.Farm_Data){
            // $Response_Data = json_encode($Response_Data);
            // echo '{"Knowledge_Data": ' .$Response_Data .','.'"xxx": '.$Response_Data .'}';
            // echo $Response_Data[$i]->News_Id;
            for($i=0;$i<count($Response_Data);$i++){
                // echo 'Response_Data = '.$Response_Data[$i]->Farm_Id;
                $sql_query = "SELECT Img_Farm_Name from image_farm where Farm_Id='".$Response_Data[$i]->Farm_Id."'";
                // echo "sql_query = ".$sql_query;
                $conn = getDB();
                $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                $rst =$conn->query($sql_query);
                $image = $rst->fetchAll(PDO::FETCH_OBJ);
                // echo 'Image = '.json_encode($image).'<br>';
                array_push($Response_Img_Data,$image);
                
            }
            // echo json_encode($Response_Img_Data);
            $Response_Data = json_encode($Response_Data);
            $Response_Img_Data = json_encode($Response_Img_Data);
            // echo $Response_Img_Data;
            echo '{"Farm_Data": ' .$Response_Data .','.'"Farm_Image": '.$Response_Img_Data .'}';
        }
        else{
            $Response_Data = json_encode($Response_Data);
            echo '{"Null": ' .$Response_Data . '}';
        }   
                 
    }
    catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
}

function Change_Animals_Type(){
    $request = \Slim\Slim::getInstance()->request();
    $data = json_decode($request->getBody());
    $Animal_Name = $data->Data;
    $Animal_Id = $data->Id;
    // echo json_encode($data);
    $Response_Data = array();  
    try {           
        $sql_query = "UPDATE animals set Animal_Name='$Animal_Name' WHERE Animal_Id='$Animal_Id'";
        $conn = getDB();
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $conn->query($sql_query);

        // $sql_query = "select * from admin where Admin_Id='$Admin_Id'";
        // $conn = getDB();
        // $rst = $conn->query($sql_query);
        // $Response_Data= $rst->fetchAll(PDO::FETCH_OBJ);
        // $Response_Data = json_encode($Response_Data);
        // echo '{"Admin_Data": ' .$Response_Data . '}'; 
        echo '{"Finish":"d"}';
    }
    catch(PDOException $e) {
        echo 'error: '. $e->getMessage();
    }
}
function Change_Knowledge_Type(){
    $request = \Slim\Slim::getInstance()->request();
    $data = json_decode($request->getBody());
    $T_Know_Name = $data->Data;
    $T_Know_Id = $data->Id;
    // echo json_encode($data);
    $Response_Data = array();  
    try {           
        $sql_query = "UPDATE type_knowledge set T_Know_Name='$T_Know_Name' WHERE T_Know_Id='$T_Know_Id'";
        $conn = getDB();
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $conn->query($sql_query);
        echo '{"Finish":"d"}';
    }
    catch(PDOException $e) {
        echo 'error: '. $e->getMessage();
    }
}
function Change_News_Type(){
    $request = \Slim\Slim::getInstance()->request();
    $data = json_decode($request->getBody());
    $T_News_Name = $data->Data;
    $T_News_Id = $data->Id;
    // echo json_encode($data);
    $Response_Data = array();  
    try {           
        $sql_query = "UPDATE type_news set T_News_Name='$T_News_Name' WHERE T_News_Id='$T_News_Id'";
        $conn = getDB();
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $conn->query($sql_query);
        echo '{"Finish":"d"}';
    }
    catch(PDOException $e) {
        echo 'error: '. $e->getMessage();
    }
}
function Change_Market_Type(){
    $request = \Slim\Slim::getInstance()->request();
    $data = json_decode($request->getBody());
    $T_Market_Name = $data->Data;
    $T_Market_Id = $data->Id;
    // echo json_encode($data);
    $Response_Data = array();  
    try {           
        $sql_query = "UPDATE type_market set T_Market_Name='$T_Market_Name' WHERE T_Market_Id='$T_Market_Id'";
        $conn = getDB();
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $conn->query($sql_query);
        echo '{"Finish":"d"}';
    }
    catch(PDOException $e) {
        echo 'error: '. $e->getMessage();
    }
}
function Change_Posts_Type(){
    $request = \Slim\Slim::getInstance()->request();
    $data = json_decode($request->getBody());
    $T_Posts_Name = $data->Data;
    $T_Posts_Id = $data->Id;
    // echo json_encode($data);
    $Response_Data = array();  
    try {           
        $sql_query = "UPDATE type_posts set T_Posts_Name='$T_Posts_Name' WHERE T_Posts_Id='$T_Posts_Id'";
        $conn = getDB();
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $conn->query($sql_query);
        echo '{"Finish":"d"}';
    }
    catch(PDOException $e) {
        echo 'error: '. $e->getMessage();
    }
}


//////////////////////////////////////
function Add_Animals_Type(){
    $request = \Slim\Slim::getInstance()->request();
    $data = json_decode($request->getBody());
    $Animal_Name = $data->Data;
    // $Animal_Id = $data->Id;
    // echo json_encode($data);
    $Response_Data = array();  
    try {           
        // $sql_query = "UPDATE animals set Animal_Name='$Animal_Name' WHERE Animal_Id='$Animal_Id'";
        $sql_query = "INSERT INTO animals(Animal_Name) VALUES ('$Animal_Name')";
        $conn = getDB();
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $conn->query($sql_query);
        echo '{"Finish":"d"}';
    }
    catch(PDOException $e) {
        echo 'error: '. $e->getMessage();
    }
}
function Add_Knowledge_Type(){
    $request = \Slim\Slim::getInstance()->request();
    $data = json_decode($request->getBody());
    $T_Know_Name = $data->Data;
    // $Animal_Id = $data->Id;
    // echo json_encode($data);
    $Response_Data = array();  
    try {           
        // $sql_query = "UPDATE animals set Animal_Name='$Animal_Name' WHERE Animal_Id='$Animal_Id'";
        $sql_query = "INSERT INTO type_knowledge(T_Know_Name) VALUES ('$T_Know_Name')";
        $conn = getDB();
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $conn->query($sql_query);
        echo '{"Finish":"d"}';
    }
    catch(PDOException $e) {
        echo 'error: '. $e->getMessage();
    }
}
function Add_News_Type(){
    $request = \Slim\Slim::getInstance()->request();
    $data = json_decode($request->getBody());
    $T_News_Name = $data->Data;
    // $Animal_Id = $data->Id;
    // echo json_encode($data);
    $Response_Data = array();  
    try {           
        // $sql_query = "UPDATE animals set Animal_Name='$Animal_Name' WHERE Animal_Id='$Animal_Id'";
        $sql_query = "INSERT INTO type_news(T_News_Name) VALUES ('$T_News_Name')";
        $conn = getDB();
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $conn->query($sql_query);
        echo '{"Finish":"d"}';
    }
    catch(PDOException $e) {
        echo 'error: '. $e->getMessage();
    }
}
function Add_Market_Type(){
    $request = \Slim\Slim::getInstance()->request();
    $data = json_decode($request->getBody());
    $T_Market_Name = $data->Data;
    // $Animal_Id = $data->Id;
    // echo json_encode($data);
    $Response_Data = array();  
    try {           
        // $sql_query = "UPDATE animals set Animal_Name='$Animal_Name' WHERE Animal_Id='$Animal_Id'";
        $sql_query = "INSERT INTO type_market(T_Market_Name) VALUES ('$T_Market_Name')";
        $conn = getDB();
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $conn->query($sql_query);
        echo '{"Finish":"d"}';
    }
    catch(PDOException $e) {
        echo 'error: '. $e->getMessage();
    }
}
function Add_Posts_Type(){
    $request = \Slim\Slim::getInstance()->request();
    $data = json_decode($request->getBody());
    $T_Posts_Name = $data->Data;
    // $Animal_Id = $data->Id;
    // echo json_encode($data);
    $Response_Data = array();  
    try {           
        // $sql_query = "UPDATE animals set Animal_Name='$Animal_Name' WHERE Animal_Id='$Animal_Id'";
        $sql_query = "INSERT INTO type_posts(T_Posts_Name) VALUES ('$T_Posts_Name')";
        $conn = getDB();
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $conn->query($sql_query);
        echo '{"Finish":"d"}';
    }
    catch(PDOException $e) {
        echo 'error: '. $e->getMessage();
    }
}
/////////////////////////////////////////
function Delete_Animals_Type(){
    $request = \Slim\Slim::getInstance()->request();
    $data = json_decode($request->getBody());
    // $Animal_Name = $data->Animal_Name;
    $Animal_Id = $data->Animal_Id;
    // echo json_encode($data);
    $Response_Data = array();  
    try {           
        // $sql_query = "UPDATE animals set Animal_Name='$Animal_Name' WHERE Animal_Id='$Animal_Id'";
        $sql_query ="DELETE FROM animals WHERE Animal_Id='$Animal_Id'";
        $conn = getDB();
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $conn->query($sql_query);

        // $sql_query = "select * from admin where Admin_Id='$Admin_Id'";
        // $conn = getDB();
        // $rst = $conn->query($sql_query);
        // $Response_Data= $rst->fetchAll(PDO::FETCH_OBJ);
        // $Response_Data = json_encode($Response_Data);
        // echo '{"Admin_Data": ' .$Response_Data . '}'; 
        echo '{"Finish":"d"}';
    }
    catch(PDOException $e) {
        echo 'error: '. $e->getMessage();
    }
}
function Delete_Knowledge_Type(){
    $request = \Slim\Slim::getInstance()->request();
    $data = json_decode($request->getBody());
    // $Animal_Name = $data->Animal_Name;
    $T_Know_Id = $data->T_Know_Id;
    // echo $T_Know_Id;
    // echo json_encode($data);
    $Response_Data = array();  
    try {           
        // $sql_query = "UPDATE animals set Animal_Name='$Animal_Name' WHERE Animal_Id='$Animal_Id'";
        $sql_query ="DELETE FROM type_knowledge WHERE T_Know_Id='$T_Know_Id'";
        $conn = getDB();
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $conn->query($sql_query);

        echo '{"Finish":"d"}';
    }
    catch(PDOException $e) {
        echo 'error: '. $e->getMessage();
    }
}
function Delete_News_Type(){
    $request = \Slim\Slim::getInstance()->request();
    $data = json_decode($request->getBody());
    // $Animal_Name = $data->Animal_Name;
    $T_News_Id = $data->T_News_Id;
    // echo json_encode($data);
    $Response_Data = array();  
    try {           
        // $sql_query = "UPDATE animals set Animal_Name='$Animal_Name' WHERE Animal_Id='$Animal_Id'";
        $sql_query ="DELETE FROM type_news WHERE T_News_Id='$T_News_Id'";
        $conn = getDB();
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $conn->query($sql_query);

        // $sql_query = "select * from admin where Admin_Id='$Admin_Id'";
        // $conn = getDB();
        // $rst = $conn->query($sql_query);
        // $Response_Data= $rst->fetchAll(PDO::FETCH_OBJ);
        // $Response_Data = json_encode($Response_Data);
        // echo '{"Admin_Data": ' .$Response_Data . '}'; 
        echo '{"Finish":"d"}';
    }
    catch(PDOException $e) {
        echo 'error: '. $e->getMessage();
    }
}
function Delete_Market_Type(){
    $request = \Slim\Slim::getInstance()->request();
    $data = json_decode($request->getBody());
    // $Animal_Name = $data->Animal_Name;
    $T_Market_Id = $data->T_Market_Id;
    // echo json_encode($data);
    $Response_Data = array();  
    try {           
        // $sql_query = "UPDATE animals set Animal_Name='$Animal_Name' WHERE Animal_Id='$Animal_Id'";
        $sql_query ="DELETE FROM type_market WHERE T_Market_Id='$T_Market_Id'";
        $conn = getDB();
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $conn->query($sql_query);

        // $sql_query = "select * from admin where Admin_Id='$Admin_Id'";
        // $conn = getDB();
        // $rst = $conn->query($sql_query);
        // $Response_Data= $rst->fetchAll(PDO::FETCH_OBJ);
        // $Response_Data = json_encode($Response_Data);
        // echo '{"Admin_Data": ' .$Response_Data . '}'; 
        echo '{"Finish":"d"}';
    }
    catch(PDOException $e) {
        echo 'error: '. $e->getMessage();
    }
}
function Delete_Posts_Type(){
    $request = \Slim\Slim::getInstance()->request();
    $data = json_decode($request->getBody());
    // $Animal_Name = $data->Animal_Name;
    $T_Posts_Id = $data->T_Posts_Id;
    // echo json_encode($data);
    $Response_Data = array();  
    try {           
        // $sql_query = "UPDATE animals set Animal_Name='$Animal_Name' WHERE Animal_Id='$Animal_Id'";
        $sql_query ="DELETE FROM type_posts WHERE T_Posts_Id='$T_Posts_Id'";
        $conn = getDB();
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $conn->query($sql_query);

        // $sql_query = "select * from admin where Admin_Id='$Admin_Id'";
        // $conn = getDB();
        // $rst = $conn->query($sql_query);
        // $Response_Data= $rst->fetchAll(PDO::FETCH_OBJ);
        // $Response_Data = json_encode($Response_Data);
        // echo '{"Admin_Data": ' .$Response_Data . '}'; 
        echo '{"Finish":"d"}';
    }
    catch(PDOException $e) {
        echo 'error: '. $e->getMessage();
    }
}

?>