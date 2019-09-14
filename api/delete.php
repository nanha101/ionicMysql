<?php
include 'config.php';
// echo "Hello".'<br>';
// $conn = getDB();
// echo json_decode($_POST)->Know_Name;
// echo json_decode($_POST);
// echo 'Hello delete.php';
$_POST['Function_Name']();

function Delete_News(){
    /////// Set Data //////////
    $News_Id = $_POST['News_Id'];
    // echo $News_Id;

    //////////////////////////// Get Image_News_Name from image_News table /////////////
    $sql_query ="Select Img_News_Name FROM image_news WHERE News_Id='$News_Id'";
    $conn = getDB();
    // $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $rst = $conn->query($sql_query);
    $Response_Data= $rst->fetchAll(PDO::FETCH_NUM);
    // echo count($Response_Data);
    for($i=0;$i<count($Response_Data);$i++){
        // echo $Response_Data[$i][0].'<br>';
        unlink("./image/".$Response_Data[$i][0]);
    }
 
    /////////////////////// Delete on Image_News Table //////////////
    $sql_query ="DELETE FROM image_news WHERE News_Id='$News_Id'";
    $conn = getDB();
    // $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $conn->query($sql_query);
    
    ////////////////// Delete on News Table ////////////
    $sql_query ="DELETE FROM news WHERE News_Id='$News_Id'";
    $conn = getDB();
    // $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $conn->query($sql_query);
}
function Delete_Knowledge(){
    /////// Set Data //////////
    $Know_Id = $_POST['Know_Id'];
    // echo $Know_Id;

    //////////////////////////// Get Image_know_Name from image_knowledge table /////////////
    $sql_query ="Select Img_Know_Name FROM image_knowledge WHERE Know_Id='$Know_Id'";
    $conn = getDB();
    // $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $rst = $conn->query($sql_query);
    $Response_Data= $rst->fetchAll(PDO::FETCH_NUM);
    // echo count($Response_Data);
    for($i=0;$i<count($Response_Data);$i++){
        // echo $Response_Data[$i][0].'<br>';
        unlink("./image/".$Response_Data[$i][0]);
    }
 
    /////////////////////// Delete on Image_Knowledge Table //////////////
    $sql_query ="DELETE FROM image_knowledge WHERE Know_Id='$Know_Id'";
    $conn = getDB();
    // $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $conn->query($sql_query);
    
    ////////////////// Delete on Knowledge Table ////////////
    $sql_query ="DELETE FROM knowledge WHERE Know_Id='$Know_Id'";
    $conn = getDB();
    // $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $conn->query($sql_query);
}
function Deny_Farm(){
    $Farm_Id = $_POST['Farm_Id'];
    echo $Farm_Id;
    ////////////////////////// Get Image_Farm_Name from image_Farm table /////////////
    $sql_query ="Select Img_Farm_Name FROM image_farm WHERE Farm_Id='$Farm_Id'";
    $conn = getDB();
    // $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $rst = $conn->query($sql_query);
    $Response_Data= $rst->fetchAll(PDO::FETCH_NUM);
    // echo count($Response_Data);
    for($i=0;$i<count($Response_Data);$i++){
        // echo $Response_Data[$i][0].'<br>';
        unlink("./image/".$Response_Data[$i][0]);
    }

    ////////////////////////// Delete Profile_Image ////////////////////
    $sql_query ="Select Profile_Image FROM farm WHERE Farm_Id='$Farm_Id'";
    $conn = getDB();
    // $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $rst = $conn->query($sql_query);
    $Response_Data= $rst->fetchAll(PDO::FETCH_NUM);
    // echo 'response_data = '.json_encode($Response_Data[0][0]);
    if($Response_Data[0][0]){
        // echo 'asdfsdafasdfasdf';
        unlink("./image/".$Response_Data[0][0]);
    }
    /////////////////////// Delete on Image_Farm Table //////////////
    $sql_query ="DELETE FROM image_farm WHERE Farm_Id='$Farm_Id'";
    $conn = getDB();
    // $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $conn->query($sql_query);
    
    ////////////////// Delete on Farm Table ////////////
    $sql_query ="DELETE FROM farm WHERE Farm_Id='$Farm_Id'";
    $conn = getDB();
    // $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $conn->query($sql_query); 
}

function Delete_Market(){
     /////// Set Data //////////
     $Market_Id = $_POST['Market_Id'];
     // echo $Market_Id;
 
     //////////////////////////// Get Image_Market_Name from image_Market table /////////////
     $sql_query ="Select Img_Market_Name FROM image_market WHERE Market_Id='$Market_Id'";
     $conn = getDB();
     // $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
     $rst = $conn->query($sql_query);
     $Response_Data= $rst->fetchAll(PDO::FETCH_NUM);
     // echo count($Response_Data);
     for($i=0;$i<count($Response_Data);$i++){
         // echo $Response_Data[$i][0].'<br>';
         unlink("./image/".$Response_Data[$i][0]);
     }
  
     /////////////////////// Delete on Image_Market Table //////////////
     $sql_query ="DELETE FROM image_market WHERE Market_Id='$Market_Id'";
     $conn = getDB();
     // $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
     $conn->query($sql_query);
     
     ////////////////// Delete on Market Table ////////////
     $sql_query ="DELETE FROM market WHERE Market_Id='$Market_Id'";
     $conn = getDB();
     // $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
     $conn->query($sql_query);
}

function Delete_Comments(){
     /////// Set Data //////////
     $comment_Id = $_POST['comment_Id'];
     // echo $Know_Id;
 
     //////////////////////////// Get Image_know_Name from image_knowledge table /////////////
     $sql_query ="Select Img_comment_Name FROM image_comment WHERE comment_Id='$comment_Id'";
     $conn = getDB();
     // $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
     $rst = $conn->query($sql_query);
     $Response_Data= $rst->fetchAll(PDO::FETCH_NUM);
     // echo count($Response_Data);
     for($i=0;$i<count($Response_Data);$i++){
         // echo $Response_Data[$i][0].'<br>';
         unlink("./image/".$Response_Data[$i][0]);
     }
  
     /////////////////////// Delete on Image_comment Table //////////////
     $sql_query ="DELETE FROM image_comment WHERE comment_Id='$comment_Id'";
     $conn = getDB();
     // $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
     $conn->query($sql_query);
     
     ////////////////// Delete on comment Table ////////////
     $sql_query ="DELETE FROM comments WHERE comment_Id='$comment_Id'";
     $conn = getDB();
     // $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
     $conn->query($sql_query);
}
function Delete_Posts(){
    /////// Set Data //////////
    $Posts_Id = $_POST['Posts_Id'];
    // echo $Know_Id;

    //////////////////////////// Get Image_know_Name from image_knowledge table /////////////
    $sql_query ="Select Img_Posts_Name FROM image_posts WHERE Posts_Id='$Posts_Id'";
    $conn = getDB();
    // $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $rst = $conn->query($sql_query);
    $Response_Data= $rst->fetchAll(PDO::FETCH_NUM);
    // echo count($Response_Data);
    for($i=0;$i<count($Response_Data);$i++){
        // echo $Response_Data[$i][0].'<br>';
        unlink("./image/".$Response_Data[$i][0]);
    }
 
    /////////////////////// Delete on Image_comment Table //////////////
    $sql_query ="DELETE FROM image_posts WHERE Posts_Id='$Posts_Id'";
    $conn = getDB();
    // $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $conn->query($sql_query);
    
    ////////////////// Delete on comment Table ////////////
    $sql_query ="DELETE FROM posts WHERE Posts_Id='$Posts_Id'";
    $conn = getDB();
    // $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $conn->query($sql_query);
}

?>