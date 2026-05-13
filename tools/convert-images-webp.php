<?php
declare(strict_types=1);
$root=$argv[1]??dirname(__DIR__);
if(!extension_loaded('gd')){fwrite(STDERR,"GD extension is required.\n");exit(1);} 
$it=new RecursiveIteratorIterator(new RecursiveDirectoryIterator($root,FilesystemIterator::SKIP_DOTS));
foreach($it as $file){$ext=strtolower($file->getExtension());if(!in_array($ext,['jpg','jpeg','png'],true))continue;$src=$file->getPathname();$dst=preg_replace('/\.(jpe?g|png)$/i','.webp',$src);if(is_file($dst)&&filemtime($dst)>=filemtime($src))continue;$img=$ext==='png'?imagecreatefrompng($src):imagecreatefromjpeg($src);if(!$img)continue;imagepalettetotruecolor($img);imagewebp($img,$dst,82);imagedestroy($img);echo "Wrote $dst\n";}
