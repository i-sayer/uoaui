self.dutil = {
    fyshuffle: function(a) { // fisher yates shuffle
        for (let i=a.length-1; i>0; i--){
            let j = Math.floor(Math.random()*(i+1));
            [a[i], a[j]] = [a[j], a[i]];
        }
    },
    randomBarBg: function(selector) {
        selector = selector || "body";
        var ibars = Array.from({length:20}, (u,i)=>i*5+2);
        var ihues =  Array.from({length:36}, (u,i)=>i*10+5);
        let blends = ["multiply","darken","saturation","color-dodge"]
        let gall = [];
        this.fyshuffle(blends);
        for (let m=0; m<4; m++){
            this.fyshuffle(ibars);
            this.fyshuffle(ihues);
            var p = ibars.slice(0,6).sort((a,b)=>a-b);
            var c = ihues.slice(0,6).map((h,i,a)=>{return (i&1)?a[i-1]+120:h});
            let gra = [];
            let sat = (m*25+15)+"%";
            for (let n=0; n<5; n++)
                gra.push(`hsla(${c[n]},${sat},40%,0.35) ${p[n]}%, hsla(${c[n+1]},${sat},70%,0.15) ${p[n]+1}%`);
            gall.push(`linear-gradient(${m*75+10}deg,${gra.join(",")})`);
        }
        var ss = document.styleSheets[0] || document.body.appendChild(document.createElement("style"));
        ss.insertRule(`${selector} {background-image:${gall.join(",")};}`);
    },
    icelandic: function(){
        let base="eeeeeeeeetttttttaaaaaoooooiiiinnnssshhrrdllccmmwwffggyypbvkj           ".split("");
        base = [...base,...base,...base,...base];
        this.fyshuffle(base);
        return base.join("").match(/\b[\w']+(?:[^\w\n]+[\w']+){0,5}\b/g).map(u=>u[0].toUpperCase()+u.slice(1)).join(". ");
        //return base.join("");
    }

}