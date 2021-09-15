let idInicio=null,idFim=null;
let iRobo=null,jRobo=null;
let iAnterior=null,jAnterior=null;
let iFim,jFim;
let desligar;
let posicaoRobo = document.querySelector("input#posicaoRobo");

function addremove(i,j){
    let manipular = document.querySelector("input#p"+i+j)
    let checkboxobjeto = document.getElementById("objetos");
    let checkboxinicio = document.getElementById("inicio");
    let checkboxfim = document.getElementById("fim");
    let posicaoInicio = document.getElementById("inputInicio");
    let posicaoFim = document.getElementById("inputFim");
    let aux=false;

    if(iRobo!=null || jRobo!=null)
    {
        if(manipular.id == document.querySelector("input#p"+iRobo+""+jRobo).id)
        {
            aux=true;
        }
    }
    
    if(checkboxobjeto.checked)
    {
        if((manipular.name==''|| manipular.name=='vazio'|| manipular.name=='objeto') && aux==false)
        {
            if(manipular.name==''|| manipular.name=='vazio' ){
                manipular.style.backgroundColor = 'white';
                manipular.setAttribute("name","vazio");
            }
            if( manipular.style.backgroundColor == 'white')
            {
                manipular.style.backgroundColor = 'black';
                manipular.setAttribute("name","objeto");
            }
            else
            {
                if(manipular.style.backgroundColor == 'black')
                {
                    manipular.style.backgroundColor = 'white';
                    manipular.setAttribute("name","vazio");
                }
            }
        }
        else
        {
            window.alert('local em uso');
        }
                      
    } 
    if(checkboxinicio.checked)
    {
        if(manipular.name!='fim' && manipular.name!='objeto' && manipular.name!='inicio' && aux==false)
        {
            posicaoInicio.value = 'linha='+(i+1)+' coluna='+(j+1);
            manipular.name='inicio';
            manipular.style.backgroundColor = 'red';
            if(idInicio!=null && idInicio != manipular.id){
                let anterior = document.getElementById(idInicio);
                anterior.name = 'vazio';
                anterior.style.backgroundColor = 'white';
            }
            if(iRobo!=null && jRobo != null){
                let antiga = document.querySelector("input#p"+iRobo+jRobo);
                antiga.style.backgroundColor='white';               
            }
            idInicio='p'+i+''+j;            
            iRobo=i;
            jRobo=j;
            posicaoRobo.value='linha='+(iRobo+1)+' coluna='+(jRobo+1);
            if(iAnterior!=null || jAnterior!=null)
            {
                document.querySelector("input#p"+iAnterior+jAnterior).style.backgroundColor='white'
            }            
            iAnterior=null;
            jAnterior=null;
        }
        else
        {
            if(manipular.name=='inicio')
            {
                if(iRobo!=null && jRobo != null){
                    let antiga = document.querySelector("input#p"+iRobo+jRobo);
                    antiga.style.backgroundColor='white';               
                }
                manipular.name='vazio';
                manipular.style.backgroundColor = 'white';
                posicaoInicio.value ='';
                iRobo=null;
                jRobo=null;
                posicaoRobo.value='';

                document.querySelector("input#p"+iAnterior+jAnterior).style.backgroundColor='white'
                iAnterior=null;
                jAnterior=null;
            }
            else
            {
                window.alert('local em uso');
            }
        }
    }  
    if(checkboxfim.checked)
    {
        if(manipular.name!='inicio' && manipular.name!='objeto' && manipular.name!='fim' && aux==false)
        {
            posicaoFim.value = 'linha='+(i+1)+' coluna='+(j+1);
            manipular.name='fim';
            if(idFim!=null && idFim != manipular.id){
                let anterior = document.getElementById(idFim);
                anterior.name = 'vazio';
            }
            idFim='p'+i+''+j;
            iFim=i;
            jFim=j;           
        }else{
            if(manipular.name=='fim')
            {
                manipular.name='vazio';
                posicaoFim.value ='';
                iFim=null;
                jFim=null;
            }
            else
            {
                window.alert('local em uso');
            }
        }
    }  
}
function andar()
{
    if(document.querySelector("input#p"+iRobo+jRobo).name != 'fim')
    {
        var mapa = new Array();
        for(let i=0;i<6;i++){
            mapa[i]= new Array();
            for(let j=0;j<6;j++){
                let guardar = document.querySelector("input#p"+i+j);
                mapa[i][j] = parseInt(guardar.value);
            }
        }
        let imenor=null;
        let jmenor=null;
        if((parseInt(jRobo)+1)<=5 && document.querySelector("input#p"+iRobo+""+(jRobo+1)).name!='objeto')        
        {
            imenor=iRobo;
            jmenor=parseInt(jRobo)+1;
        }    
        if((parseInt(iRobo)-1)>=0  && document.querySelector("input#p"+(iRobo-1)+""+jRobo).name!='objeto')
        {
            if(imenor==null && jmenor==null)
            {
                imenor=parseInt(iRobo)-1;
                jmenor=jRobo;
            }
            else
            {
                if(mapa[imenor][jmenor] >= mapa[parseInt(iRobo)-1][jRobo])
                {
                        
                    if(mapa[imenor][jmenor] != mapa[parseInt(iRobo)-1][jRobo])
                    {
                        imenor=parseInt(iRobo)-1;
                        jmenor=jRobo;
                    }else
                    {                
                        if(((Math.random()>0.5)? 1 : 0)==0)
                        {
                            imenor=parseInt(iRobo)-1;
                            jmenor=jRobo;
                        }
                    }
                                
                }
            }
        }
        if((parseInt(jRobo)-1)>=0 && document.querySelector("input#p"+iRobo+""+(jRobo-1)).name!='objeto')
        {
            if(imenor==null && jmenor==null)
            {
                imenor=iRobo
                jmenor=parseInt(jRobo)-1
            }
            else
            {
                if(mapa[imenor][jmenor] >= mapa[iRobo][parseInt(jRobo)-1])
                {
                        
                    if(mapa[imenor][jmenor] == mapa[iRobo][parseInt(jRobo)-1])
                    {
                        if(((Math.random()>0.5)? 1 : 0)==0)
                        {
                            imenor=iRobo
                            jmenor=parseInt(jRobo)-1
                        }
                    }else
                    {
                        imenor=iRobo
                        jmenor=parseInt(jRobo)-1
                    }            
                }
            } 
        }
        if((parseInt(iRobo)+1)<=5 && document.querySelector("input#p"+(iRobo+1)+""+jRobo).name!='objeto') 
        {
            if(imenor==null && jmenor==null)
            {
                imenor=parseInt(iRobo)+1
                jmenor=jRobo
            }
            else
            {
                if(mapa[imenor][jmenor] >= mapa[parseInt(iRobo)+1][jRobo])
                {
                    if(mapa[imenor][jmenor] != mapa[parseInt(iRobo)+1][jRobo])
                    {
                        imenor=parseInt(iRobo)+1
                        jmenor=jRobo
                    }else
                        {                
                        if(((Math.random()>0.5)? 1 : 0)==0)
                        {
                            imenor=parseInt(iRobo)+1
                            jmenor=jRobo
                        }
                    }            
            }
            }
        } 
        let nova = document.querySelector("input#p"+imenor+jmenor);
        let antiga = document.querySelector("input#p"+iRobo+jRobo);
        if(nova!=null)
        {
            antiga.style.backgroundColor='yellow';
            nova.style.backgroundColor='red';
            antiga.value = parseInt(nova.value)+1;
            if(iAnterior!=null || jAnterior!=null)
            {
                if(iAnterior==imenor && jAnterior == jmenor)
                {
                    document.querySelector("input#p"+iAnterior+jAnterior).style.backgroundColor='red';
                }
                else
                {
                    if(document.querySelector("input#p"+iAnterior+jAnterior).name!='objeto')
                    {
                        document.querySelector("input#p"+iAnterior+jAnterior).style.backgroundColor='white';
                    }
                }            
            }
            iAnterior=iRobo;
            jAnterior=jRobo;
            iRobo=imenor;
            jRobo=jmenor;
            
            posicaoRobo.value='linha='+(iRobo+1)+' coluna='+(jRobo+1);
        }
        else
        {
            desabilitar(1);
            clearInterval(desligar);
            window.alert('nao a caminho para o robo')
        }
    }
    else
    {
        desabilitar(1);
        clearInterval(desligar);
        window.alert('Robo chegou no destino');
    }
}
function iniciar(i)
{
    if(iRobo==null || jRobo==null)
    {
        window.alert('o robo não ocupa nenuma posição')
    }else
    {
        if(i==0)
        {
            desligar = setInterval(andar,500);
            desabilitar(0);
        }  
        if(i==1)
        {
            clearInterval(desligar);
            desabilitar(1);
        }  
        if(i==2)
        {
            andar();
        }
    }
    
}
function desabilitar(i)
{
    let checkboxobjeto = document.getElementById("objetos");
    let checkboxinicio = document.getElementById("inicio");
    let checkboxfim = document.getElementById("fim");
    
    if(i==0)
    {
        for(let i=0;i<6;i++){
            for(let j=0;j<6;j++){
                document.querySelector("input#p"+i+j).disabled=true;
            }
        }
        document.querySelector("input#teste").disabled=true;
        document.querySelector("input#iniciar").disabled=true;
        document.querySelector("input#carregar").disabled=true;
        document.querySelector("input#salvar").disabled=true;

        checkboxobjeto.disabled=true;
        checkboxinicio.disabled=true;
        checkboxfim.disabled=true;   

    }
    if(i==1)
    {
        for(let i=0;i<6;i++){
            for(let j=0;j<6;j++){
                document.querySelector("input#p"+i+j).disabled=false;
            }
        }
        document.querySelector("input#teste").disabled=false;
        document.querySelector("input#iniciar").disabled=false;
        document.querySelector("input#carregar").disabled=false;
        document.querySelector("input#salvar").disabled=false;

        checkboxobjeto.disabled=false;
        checkboxinicio.disabled=false;
        checkboxfim.disabled=false;   

    }
   if(i==2)
   {
        checkboxinicio.checked=false;
        checkboxfim.checked=false
   }
   if(i==3)
   {
        checkboxobjeto.checked=false;
        checkboxfim.checked=false
   }
   if(i==4)
   {
        checkboxinicio.checked=false;
        checkboxobjeto.checked=false
   }
}
function salvar() 
{   
    var mapa = new Array();
    for(let i=0;i<6;i++){
        mapa[i]= new Array();
        for(let j=0;j<6;j++){
            let guardar = document.querySelector("input#p"+i+j);
            if(guardar.name!='objeto')
            {
                mapa[i][j] = parseInt(guardar.value);
            }else{
                mapa[i][j] ='objeto';
            }
        }
    } 
    let text = JSON.stringify(mapa); 

    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', 'mapa.txt'); 

    document.body.appendChild(element);
    element.click();  
    document.body.removeChild(element);

}
document.getElementById('carregar').addEventListener('change', function()
    {              
        var fr=new FileReader(); 
        fr.onload=function()
        { 
            let text = fr.result;
            var mapa = JSON.parse(text);
            for(let i=0;i<6;i++){
                for(let j=0;j<6;j++){
                    let manipular = document.querySelector("input#p"+i+j);
                    if(mapa[i][j]!='objeto')
                    {
                        manipular.value = parseInt(mapa[i][j]);
                        manipular.style.backgroundColor = 'white';
                        manipular.setAttribute("name","vazio");
                    }
                    else
                    {
                        manipular.style.backgroundColor = 'black';
                        manipular.setAttribute("name","objeto");
                    }
                }
            }
            idInicio=null;
            idFim=null;
            iRobo=null;
            jRobo=null;
            iAnterior=null;
            jAnterior=null;
            iFim=null;
            jFim=null;
            let posicaoInicio = document.getElementById("inputInicio");
            let posicaoFim = document.getElementById("inputFim");
            posicaoRobo.value='';
            posicaoInicio.value = '';
            posicaoFim.value = '';
        }              
        fr.readAsText(this.files[0]); 
    }
) 
