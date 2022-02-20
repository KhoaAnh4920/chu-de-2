<?php
$pdo=new PDO('mysql:host=localhost;dbname=bookstore', 'root', '');
$pdo->query('set names utf8');
$kw=$_GET['n'];
$sql="select * from book where book_name like '%$kw%'";
$stm=$pdo->query($sql);
$data=$stm->fetchAll();
foreach($data as $d){
    ?>
    <div>
        <?php echo $d['book_id'].'---'.$d['book_name'] ?>
    </div>
    <?php 
}