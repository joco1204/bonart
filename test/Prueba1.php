<?php
include __DIR__.'/../vendor/autoload.php';

class Prueba1 extends PHPUnit_Framework_TestCase{

    public function testAssertion(){
        $this->assertTrue(true, 'Devuelve verdadero');
    }

}