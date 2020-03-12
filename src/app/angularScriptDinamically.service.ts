import { Injectable } from '@angular/core';

interface Scripts {
    name: string;
    src: string;
}
export const ScriptStore: Scripts[] = [
    // tslint:disable:max-line-length
    { name: 'revolvermap', src: '//rf.revolvermaps.com/0/0/6.js?i=5iy7lm4k0up&amp;m=7&amp;c=e63100&amp;cr1=ffffff&amp;f=arial&amp;l=0&amp;bv=90&amp;lx=-420&amp;ly=420&amp;hi=20&amp;he=7&amp;hc=a8ddff&amp;rs=80' },
    { name: 'uniqueUserschart', src: '//rf.revolvermaps.com/0/0/0.js?i=5v8wfv4e1jw&amp;d=3&amp;p=0&amp;b=0&amp;w=193&amp;g=2&amp;f=arial&amp;fs=12&amp;r=0&amp;c0=362b05&amp;c1=375363&amp;c2=000000&amp;ic0=0&amp;ic1=0' },
    { name: 'liveCounter', src: '//freehostedscripts.net/ocount.php?site="+fhs_id_h+"&name=Visits&a=1' },
    { name: 'customscript', src: '/assets/custom.js' },
];

declare var document: any;

@Injectable()
export class DynamicScriptLoaderService {

    private scripts: any = {};

    constructor() {
        ScriptStore.forEach((script: any) => {
            this.scripts[script.name] = {
                loaded: false,
                src: script.src
            };
        });
    }

    load(...scripts: string[]) {
        const promises: any[] = [];
        scripts.forEach((script) => promises.push(this.loadScript(script)));
        return Promise.all(promises);
    }

    loadScript(name: string) {
        return new Promise((resolve, reject) => {
            if (!this.scripts[name].loaded) {
                //load script
                let script = document.createElement('script');
                script.type = 'text/javascript';
                script.src = this.scripts[name].src;
                if (script.readyState) {  //IE
                    script.onreadystatechange = () => {
                        if (script.readyState === 'loaded' || script.readyState === "complete") {
                            script.onreadystatechange = null;
                            this.scripts[name].loaded = true;
                            resolve({ script: name, loaded: true, status: 'Loaded' });
                        }
                    };
                } else {  //Others
                    script.onload = () => {
                        this.scripts[name].loaded = true;
                        resolve({ script: name, loaded: true, status: 'Loaded' });
                    };
                }
                script.onerror = (error: any) => resolve({ script: name, loaded: false, status: 'Loaded' });
                document.getElementById('count').appendChild(script);
            } else {
                resolve({ script: name, loaded: true, status: 'Already Loaded' });
            }
        });
    }

}