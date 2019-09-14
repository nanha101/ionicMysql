<?php 
$host="localhost";
$user="itprojectadmin";
$pass="";
$db="itproject_travel";

$connect=mysql_connect($host,$user,$pass)or dir("No connect Database");
mysql_select_db($db,$connect); 
//$charset="SET NAMES tis620";
$charset="SET NAMES utf8";

mysql_query($charset) or die("Error No : ".mysql_errno());

//===Font TH===
//mysql_query("set names tis620",$connect);
// == แสดงข้อมูลจาก ตราราง Admin ====

?>
