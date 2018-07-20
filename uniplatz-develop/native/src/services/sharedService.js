
export default class SharedService {
    static possibleLocations() {
    /**
     * returns all possible locations for a post
     */
        return [
            'Krupp',
            'College 3',
            'Nordmetall',
            'Mercator',
            'Other',
        ];
    }

    static getTermsAndConditions() {
        const x = {
            title: 'Terms and Conditions',
            content: [
                { header: 'Terms and Conditions', text: 'Lorem ipsum dolor sit amet, verear consequuntur necessitatibus cu sea. Atomorum scriptorem usu cu, quas labore aperiam eos ea, ut assum tractatos gloriatur sea. Electram definiebas eu mei, cum ex mentitum conceptam. Vis detracto officiis eu, eu qui dolor iracundia, quem consequat prodesset et eum. Ex vero dolorem dissentiet nam, pri solet nominavi suscipiantur et. Eam ex commune delectus, vim mucius eripuit sanctus et, pri harum aperiam in. Vis habeo persecuti no, iudicabit quaerendum ut est.' },
                { header: 'Terms and Conditions', text: 'Lorem ipsum dolor sit amet, verear consequuntur necessitatibus cu sea. Atomorum scriptorem usu cu, quas labore aperiam eos ea, ut assum tractatos gloriatur sea. Electram definiebas eu mei, cum ex mentitum conceptam. Vis detracto officiis eu, eu qui dolor iracundia, quem consequat prodesset et eum. Ex vero dolorem dissentiet nam, pri solet nominavi suscipiantur et. Eam ex commune delectus, vim mucius eripuit sanctus et, pri harum aperiam in. Vis habeo persecuti no, iudicabit quaerendum ut est.' },
                { header: 'Privacy Policy', text: 'Lorem ipsum dolor sit amet, verear consequuntur necessitatibus cu sea. Atomorum scriptorem usu cu, quas labore aperiam eos ea, ut assum tractatos gloriatur sea. Electram definiebas eu mei, cum ex mentitum conceptam. Vis detracto officiis eu, eu qui dolor iracundia, quem consequat prodesset et eum. Ex vero dolorem dissentiet nam, pri solet nominavi suscipiantur et. Eam ex commune delectus, vim mucius eripuit sanctus et, pri harum aperiam in. Vis habeo persecuti no, iudicabit quaerendum ut est.' },
                { header: 'Privacy Policy', text: 'Lorem ipsum dolor sit amet, verear consequuntur necessitatibus cu sea. Atomorum scriptorem usu cu, quas labore aperiam eos ea, ut assum tractatos gloriatur sea. Electram definiebas eu mei, cum ex mentitum conceptam. Vis detracto officiis eu, eu qui dolor iracundia, quem consequat prodesset et eum. Ex vero dolorem dissentiet nam, pri solet nominavi suscipiantur et. Eam ex commune delectus, vim mucius eripuit sanctus et, pri harum aperiam in. Vis habeo persecuti no, iudicabit quaerendum ut est.' },
            ],
        }
        return x;
    }

    static getPrivacyPolicy() {
        const x = {
            title: 'Terms and Conditions',
            content: [
                { header: 'Terms and Conditions', text: 'Lorem ipsum dolor sit amet, verear consequuntur necessitatibus cu sea. Atomorum scriptorem usu cu, quas labore aperiam eos ea, ut assum tractatos gloriatur sea. Electram definiebas eu mei, cum ex mentitum conceptam. Vis detracto officiis eu, eu qui dolor iracundia, quem consequat prodesset et eum. Ex vero dolorem dissentiet nam, pri solet nominavi suscipiantur et. Eam ex commune delectus, vim mucius eripuit sanctus et, pri harum aperiam in. Vis habeo persecuti no, iudicabit quaerendum ut est.' },
                { header: 'Terms and Conditions', text: 'Lorem ipsum dolor sit amet, verear consequuntur necessitatibus cu sea. Atomorum scriptorem usu cu, quas labore aperiam eos ea, ut assum tractatos gloriatur sea. Electram definiebas eu mei, cum ex mentitum conceptam. Vis detracto officiis eu, eu qui dolor iracundia, quem consequat prodesset et eum. Ex vero dolorem dissentiet nam, pri solet nominavi suscipiantur et. Eam ex commune delectus, vim mucius eripuit sanctus et, pri harum aperiam in. Vis habeo persecuti no, iudicabit quaerendum ut est.' },
                { header: 'Privacy Policy', text: 'Lorem ipsum dolor sit amet, verear consequuntur necessitatibus cu sea. Atomorum scriptorem usu cu, quas labore aperiam eos ea, ut assum tractatos gloriatur sea. Electram definiebas eu mei, cum ex mentitum conceptam. Vis detracto officiis eu, eu qui dolor iracundia, quem consequat prodesset et eum. Ex vero dolorem dissentiet nam, pri solet nominavi suscipiantur et. Eam ex commune delectus, vim mucius eripuit sanctus et, pri harum aperiam in. Vis habeo persecuti no, iudicabit quaerendum ut est.' },
                { header: 'Privacy Policy', text: 'Lorem ipsum dolor sit amet, verear consequuntur necessitatibus cu sea. Atomorum scriptorem usu cu, quas labore aperiam eos ea, ut assum tractatos gloriatur sea. Electram definiebas eu mei, cum ex mentitum conceptam. Vis detracto officiis eu, eu qui dolor iracundia, quem consequat prodesset et eum. Ex vero dolorem dissentiet nam, pri solet nominavi suscipiantur et. Eam ex commune delectus, vim mucius eripuit sanctus et, pri harum aperiam in. Vis habeo persecuti no, iudicabit quaerendum ut est.' },
            ],
        }
        return x;
    }

    static getTermsAndPrivacy() {
        const x = {
            title: 'Terms and Conditions',
            content: [
                { header: 'Terms and Conditions', text: 'Lorem ipsum dolor sit amet, verear consequuntur necessitatibus cu sea. Atomorum scriptorem usu cu, quas labore aperiam eos ea, ut assum tractatos gloriatur sea. Electram definiebas eu mei, cum ex mentitum conceptam. Vis detracto officiis eu, eu qui dolor iracundia, quem consequat prodesset et eum. Ex vero dolorem dissentiet nam, pri solet nominavi suscipiantur et. Eam ex commune delectus, vim mucius eripuit sanctus et, pri harum aperiam in. Vis habeo persecuti no, iudicabit quaerendum ut est.' },
                { header: 'Terms and Conditions', text: 'Lorem ipsum dolor sit amet, verear consequuntur necessitatibus cu sea. Atomorum scriptorem usu cu, quas labore aperiam eos ea, ut assum tractatos gloriatur sea. Electram definiebas eu mei, cum ex mentitum conceptam. Vis detracto officiis eu, eu qui dolor iracundia, quem consequat prodesset et eum. Ex vero dolorem dissentiet nam, pri solet nominavi suscipiantur et. Eam ex commune delectus, vim mucius eripuit sanctus et, pri harum aperiam in. Vis habeo persecuti no, iudicabit quaerendum ut est.' },
                { header: 'Privacy Policy', text: 'Lorem ipsum dolor sit amet, verear consequuntur necessitatibus cu sea. Atomorum scriptorem usu cu, quas labore aperiam eos ea, ut assum tractatos gloriatur sea. Electram definiebas eu mei, cum ex mentitum conceptam. Vis detracto officiis eu, eu qui dolor iracundia, quem consequat prodesset et eum. Ex vero dolorem dissentiet nam, pri solet nominavi suscipiantur et. Eam ex commune delectus, vim mucius eripuit sanctus et, pri harum aperiam in. Vis habeo persecuti no, iudicabit quaerendum ut est.' },
                { header: 'Privacy Policy', text: 'Lorem ipsum dolor sit amet, verear consequuntur necessitatibus cu sea. Atomorum scriptorem usu cu, quas labore aperiam eos ea, ut assum tractatos gloriatur sea. Electram definiebas eu mei, cum ex mentitum conceptam. Vis detracto officiis eu, eu qui dolor iracundia, quem consequat prodesset et eum. Ex vero dolorem dissentiet nam, pri solet nominavi suscipiantur et. Eam ex commune delectus, vim mucius eripuit sanctus et, pri harum aperiam in. Vis habeo persecuti no, iudicabit quaerendum ut est.' },
            ],
        }
        return x;
    }

    static getImpressum() {
        const x = {
            title: 'Terms and Conditions',
            content: [
                { header: 'Terms and Conditions', text: 'Lorem ipsum dolor sit amet, verear consequuntur necessitatibus cu sea. Atomorum scriptorem usu cu, quas labore aperiam eos ea, ut assum tractatos gloriatur sea. Electram definiebas eu mei, cum ex mentitum conceptam. Vis detracto officiis eu, eu qui dolor iracundia, quem consequat prodesset et eum. Ex vero dolorem dissentiet nam, pri solet nominavi suscipiantur et. Eam ex commune delectus, vim mucius eripuit sanctus et, pri harum aperiam in. Vis habeo persecuti no, iudicabit quaerendum ut est.' },
                { header: 'Terms and Conditions', text: 'Lorem ipsum dolor sit amet, verear consequuntur necessitatibus cu sea. Atomorum scriptorem usu cu, quas labore aperiam eos ea, ut assum tractatos gloriatur sea. Electram definiebas eu mei, cum ex mentitum conceptam. Vis detracto officiis eu, eu qui dolor iracundia, quem consequat prodesset et eum. Ex vero dolorem dissentiet nam, pri solet nominavi suscipiantur et. Eam ex commune delectus, vim mucius eripuit sanctus et, pri harum aperiam in. Vis habeo persecuti no, iudicabit quaerendum ut est.' },
                { header: 'Privacy Policy', text: 'Lorem ipsum dolor sit amet, verear consequuntur necessitatibus cu sea. Atomorum scriptorem usu cu, quas labore aperiam eos ea, ut assum tractatos gloriatur sea. Electram definiebas eu mei, cum ex mentitum conceptam. Vis detracto officiis eu, eu qui dolor iracundia, quem consequat prodesset et eum. Ex vero dolorem dissentiet nam, pri solet nominavi suscipiantur et. Eam ex commune delectus, vim mucius eripuit sanctus et, pri harum aperiam in. Vis habeo persecuti no, iudicabit quaerendum ut est.' },
                { header: 'Privacy Policy', text: 'Lorem ipsum dolor sit amet, verear consequuntur necessitatibus cu sea. Atomorum scriptorem usu cu, quas labore aperiam eos ea, ut assum tractatos gloriatur sea. Electram definiebas eu mei, cum ex mentitum conceptam. Vis detracto officiis eu, eu qui dolor iracundia, quem consequat prodesset et eum. Ex vero dolorem dissentiet nam, pri solet nominavi suscipiantur et. Eam ex commune delectus, vim mucius eripuit sanctus et, pri harum aperiam in. Vis habeo persecuti no, iudicabit quaerendum ut est.' },
            ],
        }
        return x;
    }
}