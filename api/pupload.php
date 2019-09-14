<?php
header('Access-Control-Allow-Origin: *');
include 'system/connect.php';
function GeraHash($qtd){ 
$Caracteres = 'ABCDEFGHIJKLMOPQRSTUVXWYZ0123456789abcdefghjklimnopqrstuvwxyz'; 
$QuantidadeCaracteres = strlen($Caracteres); 
$QuantidadeCaracteres--; 

$Hash=NULL; 
    for($x=1;$x<=$qtd;$x++){ 
        $Posicao = rand(0,$QuantidadeCaracteres); 
        $Hash .= substr($Caracteres,$Posicao,1); 
    } 

return $Hash; 
}

function resizeImage($filename, $newwidth, $newheight){
    list($width, $height) = getimagesize($filename);
    if($width > $height && $newheight < $height){
        $newheight = $height / ($width / $newwidth);
    } else if ($width < $height && $newwidth < $width) {
        $newwidth = $width / ($height / $newheight);    
    } else {
        $newwidth = $width;
        $newheight = $height;
    }
    $thumb = imagecreatetruecolor($newwidth, $newheight);
    $source = imagecreatefromjpeg($filename);
    imagecopyresized($thumb, $source, 0, 0, 0, 0, $newwidth, $newheight, $width, $height);
    return imagejpeg($thumb);
}
$picture=$_FILES['file']['name'];
$shortname =$picture;
$images =$_FILES['file']['tmp_name'];
if(exif_imagetype($images) ==  1) 
    {
		$Str_file = explode(".",$_FILES['file']['name']); 
        $new_images =  GeraHash(30).'.'.$Str_file['1'];
		$width=170; //*** Fix Width & Heigh (Autu caculate) ***//
		$size=GetimageSize($images);
		$height=170;
		$images_orig = imagecreatefromgif($images);
		$photoX = ImagesX($images_orig);
		$photoY = ImagesY($images_orig);
		$images_fin = ImageCreateTrueColor($width, $height);
		ImageCopyResampled($images_fin, $images_orig, 0, 0, 0, 0, $width+1, $height+1, $photoX, $photoY);
		
		ImageGIF($images_fin,"upload/".$new_images);
		ImageDestroy($images_orig);
		ImageDestroy($images_fin);
    }
    elseif(exif_imagetype($images) ==  3) 
    {
		$Str_file = explode(".",$_FILES['file']['name']); 
        $new_images = GeraHash(30).'.'.$Str_file['1'];
		$width=170; //*** Fix Width & Heigh (Autu caculate) ***//
		$size=GetimageSize($images);
		$height=170;
		$images_orig = imagecreatefrompng($images);
		$photoX = ImagesX($images_orig);
		$photoY = ImagesY($images_orig);
		$images_fin = ImageCreateTrueColor($width, $height);
		ImageCopyResampled($images_fin, $images_orig, 0, 0, 0, 0, $width+1, $height+1, $photoX, $photoY);
		
		ImagePNG($images_fin,"upload/".$new_images);
		ImageDestroy($images_orig);
		ImageDestroy($images_fin);
    }
    else //already png
    {    
		$Str_file = explode(".",$_FILES['file']['name']); 
        $new_images =  GeraHash(30).'.'.$Str_file['1'];
		$width=170; //*** Fix Width & Heigh (Autu caculate) ***//
		$size=GetimageSize($images);
		$height=170;
		$images_orig = imagecreatefromjpeg($images);
		$photoX = ImagesX($images_orig);
		$photoY = ImagesY($images_orig);
		$images_fin = ImageCreateTrueColor($width, $height);
		ImageCopyResampled($images_fin, $images_orig, 0, 0, 0, 0, $width+1, $height+1, $photoX, $photoY);
		
		ImageJPEG($images_fin,"upload/".$new_images);
		ImageDestroy($images_orig);
		ImageDestroy($images_fin);
    }       

isset($_POST["sid"]) ? $sid = $_POST["sid"] : $sid = '';
$sql = "update physicist set Profile='$new_images' where Physicist_ID=$sid ";
$Query = mysql_query($sql);
//$target_path = $target_path . basename( $_FILES['file']['name']);
 
if ($Query) {
    echo "Upload and move success";
} else {
echo $target_path;
    echo "There was an error uploading the file, please try again!";
}
?>