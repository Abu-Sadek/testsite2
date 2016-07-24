function getLink(ind) {
	var c = [4, 4,8,11,5,
				9,0, 1, 2,
				7,
				10,
				10,3,6,
				7,
				6,7,7][ind] ;
				
	return ['A.Franco.pdf', // Immunity and correlates of
			'Donato.pdf', // Characterization of G2P[4] rotavirus strains causing outbreaks
			'F.Ahmed.pdf', // Rotavirus Genotypes Associated with Acute Diarrhea
			'Karvonenref.pdf', // Efficacy of the pentavalent rotavirus vaccine
			'Lanata.pdf', // Global Causes of Diarrheal Disease Mortality in Children
			'Parashar.pdf', // Global Illness and Deaths Caused by Rotavirus Disease in Children
			'Payne.pdf', // Effectiveness of Pentavalent and Monovalent Rotavirus Vaccines in Concurrent Use Among US Children
			'Rtq-label.pdf', // HIGHLIGHTS OF PRESCRIBING INFORMATION
			'tate.pdf', // 2008 estimate of worldwide rotavirus-associated mortality
			'VELAZQUEZ.PDF', // ROTAVIRUS INFECTION IN INFANTS AS PROTECTION AGAINST SUBSEQUENT
			'Vesikari.pdf', // Safety and Efficacy of a Pentavalent Human–Bovine (WC3) Reassortant Rotavirus Vaccine
			'WHO-positioning-paper.pdf', // Weekly epidemiological record Relevé épidémiologique hebdomadaire
				''][c];
} // getLink 

function openPdf(ind) {
	$("div#content_root").css({ 'display': 'none' });
	$("div#index_root").css({ 'display': 'none' });
	$("div#ref_viewer").css({ 'display': 'block' });
	$('#pdf1').attr('src', 'assets/pdf/viewer.html?file=' + getLink(ind));
	$('#viewPDF-close').css({display:'block'}) ;	
}

function closePDF() {
	//$('#viewPDF-close').on('click', function() {
		$('#ref_viewer').css({display:'none'}) ;	
		$('#viewPDF-close').css({display:'none'}) ;	
		$("div#content_root").css({ 'display': 'block' });
//});
}
