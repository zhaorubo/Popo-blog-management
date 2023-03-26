export {};
export function base64ToBlob(file: File): Promise<Blob> {
    return new Promise((reslove, reject) => {
        let reader = new FileReader();
        let blob: Blob;
        reader.onload = function (e: any) {
            let arr = e.target.result.split(',');
            let data = window.atob(arr[1]);
            let mime = arr[0].match(/:(.*?);/)[1];
            let ia = new Uint8Array(data.length);
            for (var i = 0; i < data.length; i++) {
                ia[i] = data.charCodeAt(i);
            }
            blob = new Blob([ia], { type: mime });
            if (!blob) reject(blob);
            return reslove(blob);
        };
        reader.readAsDataURL(file); // 解析成base64格式
    });
}
