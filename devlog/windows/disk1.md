
disk lemot ketika write, aku bingung.

# tahap1

ketika buka  di defragment, pada disk tulisannya "optimization not available".

https://superuser.com/a/1548689/646550

(cmd)
```cmd
winsat formal
```

(pwsh)
```cmd
Optimize-Volume -DriveLetter D -ReTrim -Verbose
```

gagal, gak tau kenapa.


# tahap2

https://learn.microsoft.com/en-us/answers/questions/2441652/disk-defragmenter-error-about-chkdsk

```cmd
chkdsk D: /f /r
```
