import"./assets/modulepreload-polyfill-3cfb730f.js";/* empty css                      */import{f,i as y}from"./assets/vendor-77e16229.js";document.querySelector('input[type="text"]');const u=document.querySelector('button[type="button"]'),p=document.querySelector("[data-days]"),S=document.querySelector("[data-hours]"),v=document.querySelector("[data-minutes]"),M=document.querySelector("[data-seconds]");u.disabled=!0;const b={enableTime:!0,time_24hr:!0,defaultDate:new Date,minuteIncrement:1,onClose(e){e[0]<new Date?(y.error({message:"Please choose a date in the future",position:"topRight"}),c(!1)):(c(!0),m=e[0])}};let m=new f("input",b);class T{constructor(t){this.tick=t,this.isActive=!1}start(){this.isActive||(this.isActive=!0,this.updateTime(),this.intervalId=setInterval(()=>{this.updateTime()},1e3))}updateTime(){const t=m.getTime(),o=Date.now();t<=o&&this.onClose();const n=t-o,s=this.convertMs(n);c(!1),this.tick(s)}convertMs(t){const r=Math.floor(t/864e5),a=Math.floor(t%864e5/36e5),l=Math.floor(t%864e5%36e5/6e4),h=Math.floor(t%864e5%36e5%6e4/1e3);return{days:r,hours:a,minutes:l,seconds:h}}}const q=new T(w);u.addEventListener("click",()=>{q.start()});function w({days:e,hours:t,minutes:o,seconds:n}){const s=i(e),d=i(t),r=i(o),a=i(n);p.textContent=s,S.textContent=d,v.textContent=r,M.textContent=a}function i(e){return e.toString().padStart(2,"0")}function c(e){u.disabled=!e}
//# sourceMappingURL=commonHelpers.js.map
