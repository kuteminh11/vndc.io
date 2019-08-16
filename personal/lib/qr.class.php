<?php
/**
 * @title            QR Code
 * @desc             Compatible to vCard 4.0 or higher.
 *
 * @author           Pierre-Henry Soria <ph7software@gmail.com>
 * @copyright        (c) 2012-2017, Pierre-Henry Soria. All Rights Reserved.
 * @license          GNU General Public License <http://www.gnu.org/licenses/gpl.html>
 * @version          1.2
 */

class QRCode
{

    const API_URL = 'https://chart.googleapis.com/chart?chs=';

    private $_sData;

     
    /**
     * Constructor.
     */
    public function __construct()
    {
        $this->_sData = '';
        return $this;
    }
 
    /**
     * Generate the QR code.
     *
     * @return object this
     */
    public function finish($message)
    {
        //https://center.trustpay.vn/pay/v0j8D9KY865WVr2P4yrKgfMhG5W9WxGy
        $this->_sData .= "https://center.trustpay.vn/pay/".$message;
        $this->_sData = urlencode($this->_sData);
        return $this;
    }

    public function finish1($message)
    {
        //https://center.trustpay.vn/pay/v0j8D9KY865WVr2P4yrKgfMhG5W9WxGy
        $this->_sData .= $message;
        $this->_sData = urlencode($this->_sData);
        return $this;
    }

    /**
     * Get the URL of QR Code.
     *
     * @param integer $iSize Default 150
     * @param string $sECLevel Default L
     * @param integer $iMargin Default 1
     * @return string The API URL configure.
     */
    public function get($iSize = 200 )
    {
        return self::API_URL . $iSize . 'x' . $iSize . '&cht=qr&chld=L|1&chl=' . $this->_sData;
    }

    /**
     * The HTML code for displaying the QR Code.
     *
     * @return void
     */
    public function display()
    {
        echo '<p class="center"><img src="' . $this->_cleanUrl($this->get()) . '" alt="QR Code" /></p>';
    }

    /**
     * Clean URL.
     *
     * @param string $sUrl
     * @return string
     */
    private function _cleanUrl($sUrl)
    {
        return str_replace('&', '&amp;', $sUrl);
    }

}
