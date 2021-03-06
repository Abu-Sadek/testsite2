$(document).ready(function(){
			var $pCaption = $('.progress-bar p'),
				iProgress = document.getElementById('inactiveProgress'),
				aProgress = document.getElementById('activeProgress'),
				iProgressCTX = iProgress.getContext('2d'),
				bla = 1;
			
			drawInactive(iProgressCTX);
						
			setInterval(function(){				
				var percentage = bla / 100;
				drawProgress(aProgress, percentage, $pCaption);
				if(bla < 100){
					bla += 1 ;					
				}

			}, 10);

			function drawInactive(iProgressCTX){
				iProgressCTX.lineCap = 'square';

				//outer ring
				iProgressCTX.beginPath();
				iProgressCTX.lineWidth = 12;
				iProgressCTX.strokeStyle = '#fff';
				iProgressCTX.arc(137.5,137.5,70,0,2*Math.PI);
				iProgressCTX.stroke();

				//progress bar				
				// iProgressCTX.beginPath();
				// iProgressCTX.lineWidth = 0;
				// iProgressCTX.fillStyle = '#e6e6e6';
				// iProgressCTX.arc(137.5,13.5,66,0,2*Math.PI);
				// iProgressCTX.fill();

				//progressbar caption
				iProgressCTX.beginPath();
				iProgressCTX.lineWidth = 0;
				iProgressCTX.fillStyle = '#f2f2f2';
				iProgressCTX.arc(137.5,137.5,42,0,2*Math.PI);
				iProgressCTX.fill();

			}

			function drawProgress(bar, percentage, $pCaption){
				var barCTX = bar.getContext("2d");
				var quarterTurn = Math.PI / 2;
				var endingAngle = ((2*percentage) * Math.PI) - quarterTurn;
				var startingAngle = 0 - quarterTurn;

				//create gradient
				// var greenPart = barCTX.createLinearGradient(40,80,190,80);				
				// greenPart.addColorStop(0, '#3499da');
				// greenPart.addColorStop(1, '#2fbf8b');

				bar.width = bar.width;
				barCTX.lineCap = 'butt';

				barCTX.beginPath();
				barCTX.lineWidth = 20;
				barCTX.strokeStyle = '#2fbf8b';
				barCTX.arc(137.5,138.5,52,startingAngle, endingAngle);
				barCTX.stroke();

				$pCaption.text( (parseInt(percentage * 100, 10)) + '%');
			}

				// var percentage = $pc.val() / 100;
				// drawProgress(aProgress, percentage, $pCaption);

			
		});		