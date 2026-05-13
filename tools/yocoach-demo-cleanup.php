<?php
declare(strict_types=1);
$options=getopt('', ['dsn:', 'user:', 'pass::', 'apply']);
if(empty($options['dsn'])||empty($options['user'])){fwrite(STDERR,"Usage: php tools/yocoach-demo-cleanup.php --dsn='mysql:host=localhost;dbname=DB;charset=utf8mb4' --user=USER [--pass=PASS] [--apply]\n");exit(1);} 
$pdo=new PDO($options['dsn'],$options['user'],$options['pass']??'',[PDO::ATTR_ERRMODE=>PDO::ERRMODE_EXCEPTION]);
$patterns=['%Lorem ipsum%','%India%','%Hindistan%','%+91%','%demo@example%','%test@example%','%dummy%','%sample%'];
$tables=$pdo->query("SELECT TABLE_NAME FROM information_schema.TABLES WHERE TABLE_SCHEMA=DATABASE() AND TABLE_TYPE='BASE TABLE'")->fetchAll(PDO::FETCH_COLUMN);
$apply=array_key_exists('apply',$options);$total=0;
foreach($tables as $table){$stmt=$pdo->prepare("SELECT COLUMN_NAME FROM information_schema.COLUMNS WHERE TABLE_SCHEMA=DATABASE() AND TABLE_NAME=? AND DATA_TYPE IN ('char','varchar','text','mediumtext','longtext')");$stmt->execute([$table]);$cols=$stmt->fetchAll(PDO::FETCH_COLUMN);if(!$cols)continue;$where=[];$params=[];foreach($cols as $col){foreach($patterns as $pattern){$where[]="`$col` LIKE ?";$params[]=$pattern;}}$sql=implode(' OR ',$where);$count=$pdo->prepare("SELECT COUNT(*) FROM `$table` WHERE $sql");$count->execute($params);$matches=(int)$count->fetchColumn();if($matches===0)continue;$total+=$matches;echo ($apply?'DELETE':'DRY-RUN')." $table: $matches demo row(s)\n";if($apply){$delete=$pdo->prepare("DELETE FROM `$table` WHERE $sql");$delete->execute($params);}}
echo "Matched rows: $total\n";if(!$apply)echo "No rows deleted. Re-run with --apply after taking a database backup.\n";
