import { Component } from '@angular/core';
import MediaInfo from 'mediainfo.js'

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html'
})
export class AppComponent {
	videoInfo: any = 'No file';

	getMetadata(mediainfo: any, fileinput: any): Promise<any> {
		return new Promise<any>(res => {
			const file = fileinput.files[0]
			if (!file)
				return res("Can't get media information");

			const getSize = () => file.size
			const readChunk = (chunkSize: any, offset: any) =>
				new Promise((resolve, reject) => {
					const reader = new FileReader()
					reader.onload = (event: any) => {
						if (event.target.error) 
							reject(event.target.error)
						resolve(new Uint8Array(event.target.result))
					}
					reader.readAsArrayBuffer(file.slice(offset, offset + chunkSize))
				})

			mediainfo
				.analyzeData(getSize, readChunk)
				.then((result: any) => res(result)).catch(() => res("Can't get media information"))
		})
	}

	onChangeFile(file: any) {
		MediaInfo({ 'format': 'text' }, (mediainfo: any) => {
			this.getMetadata(mediainfo, file).then(info => 
				this.videoInfo = info.replace(/(?:\r\n|\r|\n)/g, '<br>'))

		})
	}
}
